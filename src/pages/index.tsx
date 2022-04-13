import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoInformationCircle } from "react-icons/io5";
import { Client } from "@notionhq/client";
import dayjs from "dayjs";

import { Instructions } from "../components/Instructions";
import { Results } from "../components/Results";
import { createSequence } from "../utils/createSequence";
import { GameBoard } from "../components/GameBoard";
import { toast } from "react-toastify";

const initialAttemptResult = ["", "", "", "", ""];
const initialResults = [
	initialAttemptResult,
	initialAttemptResult,
	initialAttemptResult,
	initialAttemptResult,
	initialAttemptResult,
];

interface HomeProps {
	gameNumber: number;
	sequence: string[];
}

const Home: NextPage<HomeProps> = ({ sequence, gameNumber }) => {
	const [openInstructions, setOpenInstructions] = useState(false);
	const [currentAttempt, setCurrentAttempt] = useState(1);
	const [results, setResults] = useState(initialResults);
	const [playedToday, setPlayedToday] = useState<"victory" | "defeat" | null>(
		null
	);

	function verifyAttempt(attempt: string[]) {
		if (attempt.includes("")) {
			toast.error("Hey, the sequence must have 5 numbers!", {
				icon: "😅",
				toastId: "error-toast",
			});
			return;
		}

		if (currentAttempt <= 5) {
			let playerWon = true;

			const attemptResult: string[] = sequence.map((n, i) => {
				if (attempt[i] === n) {
					return "correct";
				} else if (sequence.includes(attempt[i])) {
					playerWon = false;
					return "partial";
				}
				playerWon = false;
				return "incorrect";
			});

			const updatedResults = results;
			updatedResults[currentAttempt - 1] = attemptResult;

			setResults(updatedResults);

			if (playerWon) {
				setCurrentAttempt(6); // updating to 6 prevents user from manipulating any input

				setTimeout(() => {
					setPlayedToday("victory");
				}, 5 * 400);
			} else if (currentAttempt === 5) {
				setCurrentAttempt(6);

				setTimeout(() => {
					setPlayedToday("defeat");
				}, 5 * 400);
			} else {
				setCurrentAttempt((current) => current + 1);
			}
		}
	}

	// handle initial states
	useEffect(() => {
		const sequenceLocalItem = localStorage.getItem("sequence-game");
		if (!sequenceLocalItem) {
			localStorage.setItem("sequence-game", "{}");
			setOpenInstructions(true);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div style={{ width: "420px", margin: "auto" }}>
				<h1 style={{ textAlign: "center", fontSize: "3rem" }}>
					SEQUENCE #{gameNumber}
				</h1>

				<GameBoard
					currentAttempt={currentAttempt}
					verifyAttempt={verifyAttempt}
					results={results}
				/>
			</div>

			<IoInformationCircle
				color="var(--off-white)"
				onClick={() => setOpenInstructions(true)}
				title="Show instructions"
				size={20}
				style={{
					position: "absolute",
					top: "16px",
					left: "16px",
					cursor: "pointer",
				}}
			/>

			<Modal
				isOpen={!!playedToday}
				className="modal"
				overlayClassName="modal-overlay"
			>
				<Results playedToday={playedToday} results={results} />
			</Modal>

			<Modal
				isOpen={openInstructions}
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
				onRequestClose={() => setOpenInstructions(false)}
				className="modal"
				overlayClassName="modal-overlay"
			>
				<Instructions />
			</Modal>
		</>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const DAY_ONE = "2022-04-11";
	const today = dayjs().format("YYYY-MM-DD");

	const databaseId = process.env.DATABASE_ID || "";
	const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });

	const { results } = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: "Date",
			date: { equals: today },
		},
	});

	let sequence: string[];
	let gameNumber: number;

	if (results.length) {
		// 👇 https://github.com/makenotion/notion-sdk-js/issues/154
		const sequenceData: any = results[0];

		sequence =
			sequenceData.properties.Sequence.title[0].text.content.split("");
		gameNumber = sequenceData.properties.Number.number;
	} else {
		sequence = createSequence();
		gameNumber = dayjs(today).diff(DAY_ONE, "day") + 1;

		// save on notion
		await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				Number: {
					number: gameNumber,
				},
				Date: {
					date: {
						start: today,
						end: null,
						time_zone: null,
					},
				},
				Sequence: {
					title: [
						{
							text: {
								content: sequence.join(""),
							},
						},
					],
				},
			},
		});
	}

	return {
		props: {
			gameNumber,
			sequence,
		},
	};
};

import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { Client } from "@notionhq/client";
import dayjs from "dayjs";

import { Instructions } from "../components/Instructions";
import { Results } from "../components/Results";
import { createSequence } from "../utils/createSequence";
import { GameBoard } from "../components/GameBoard";
import { ShowInstructionsButton } from "../components/ShowInstructionsButton";
import { useDispatch } from "react-redux";
import { setSequence } from "../redux/gameSlice";

interface HomeProps {
	gameNumber: number;
	sequence: string[];
}

const Home: NextPage<HomeProps> = ({ sequence, gameNumber }) => {
	const [openInstructions, setOpenInstructions] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const sequenceLocalItem = localStorage.getItem("sequence-game");
		if (!sequenceLocalItem) {
			localStorage.setItem("sequence-game", "{}");
			setOpenInstructions(true);
		}

		dispatch(setSequence(sequence));
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div style={{ width: "420px", margin: "auto" }}>
				<h1 style={{ textAlign: "center", fontSize: "3rem" }}>
					SEQUENCE #{gameNumber}
				</h1>

				<GameBoard />

				<Results />
			</div>

			<ShowInstructionsButton onClick={() => setOpenInstructions(true)} />

			<Instructions
				isOpen={openInstructions}
				onRequestClose={() => setOpenInstructions(false)}
			/>
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

import { Center, Heading, Spinner, VStack } from "@chakra-ui/react";
import { Client } from "@notionhq/client";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { GameBoard } from "../components/GameBoard";
import { Header } from "../components/Header";
import { InstructionsModal } from "../components/InstructionsModal";
import { Keyboard } from "../components/Keyboard";
import { ResultsModal } from "../components/ResultsModal";
import { GameControllerProvider } from "../contexts";
import { localStorageHandlers } from "../services";
import { createSequence } from "../utils";

interface HomeProps {
	gameNumber: number;
	sequence: number[];
}

const Home = ({ gameNumber, sequence }: HomeProps) => {
	const [openInstructions, setOpenInstructions] = useState(false);
	const [initialValues, setInitialValues] = useState<number[][] | null>(null);
	const gameAlreadyFullyPlayed = useRef(false);

	useEffect(() => {
		const sequenceLocalItem = localStorageHandlers.get();
		const alreadyStartedThisGame =
			sequenceLocalItem?.state.lastGame === gameNumber;

		let initial: number[][] = [];

		if (!sequenceLocalItem) {
			setOpenInstructions(true);
			localStorageHandlers.create(gameNumber);
		} else if (alreadyStartedThisGame) {
			initial = sequenceLocalItem.state.tries;
		} else {
			localStorageHandlers.clearGameData(gameNumber);
		}

		if (sequenceLocalItem && sequenceLocalItem.state.gameOver) {
			gameAlreadyFullyPlayed.current = true;
		}

		setInitialValues(initial);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (initialValues === null) {
		return (
			<Center h="100vh">
				<Spinner />
			</Center>
		);
	}

	return (
		<GameControllerProvider
			sequence={sequence}
			initialValues={initialValues}
			gameAlreadyFullyPlayed={gameAlreadyFullyPlayed.current}
		>
			<Header openInstructions={() => setOpenInstructions(true)} />

			<VStack padding={4} spacing={4}>
				<Heading textAlign="center" fontSize="2xl">
					Sequence #{gameNumber}
				</Heading>

				<GameBoard />

				<Keyboard />
			</VStack>

			<Footer />

			<InstructionsModal
				isOpen={openInstructions}
				onClose={() => setOpenInstructions(false)}
			/>

			<ResultsModal gameNumber={gameNumber} />
		</GameControllerProvider>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const DAY_ONE = "2022-04-18";
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

	let sequence: number[];
	let gameNumber: number;

	if (results.length) {
		// 👇 https://github.com/makenotion/notion-sdk-js/issues/154
		const sequenceData: any = results[0];

		sequence = sequenceData.properties.Sequence.title[0].text.content
			.split("")
			.map((x: string) => Number(x));
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

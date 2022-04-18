import Modal from "react-modal";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { ResultsContainer } from "./style";
import { ShareOnTwitterButton } from "./ShareOnTwitterButton";
import { Button } from "../Button";

import { localStorageHandlers } from "../../utils/localStorageHandlers";
import StatsBoard from "./StatsBoard";

type Stats = {
	wins: number;
	games: number;
	histo: number[];
};

export const Results = () => {
	const [stats, setStats] = useState<Stats>();

	const { results, playedToday } = useSelector(
		(state: RootState) => state.game
	);

	const validAttempts = results.filter((attempt) => attempt[0].length);
	const resultsInEmojis = validAttempts
		.map((attempt) => {
			return attempt
				.map((item) => {
					if (item === "correct") {
						return "🟩";
					} else if (item === "partial") {
						return "🟨";
					} else if (item === "incorrect") {
						return "🟥";
					}
				})
				.join("");
		})
		.join("\n");

	const tweetText = `I just played The Sequence Game #1 ${
		playedToday === "victory" ? `✌️ ${validAttempts.length}/5` : "☠️"
	}\n\n${resultsInEmojis}`;

	const [showResults, setShowResults] = useState(false);
	const [showButton, setShowButton] = useState(false);
	useEffect(() => {
		if (playedToday) {
			const localObject = localStorageHandlers.get();
			if (localObject) setStats(localObject.stats);

			setTimeout(() => {
				setShowResults(true);
				setShowButton(true);
			}, 5 * 400);
		}
	}, [playedToday]);

	return (
		<>
			<Modal
				isOpen={showResults}
				className="modal"
				overlayClassName="modal-overlay"
				onRequestClose={() => setShowResults(false)}
			>
				<ResultsContainer>
					{playedToday === "victory" && <h2>You won! 🎉</h2>}
					{playedToday === "defeat" && (
						<h2>Sorry but not this time! 😔</h2>
					)}

					<StatsBoard stats={stats} />

					<p>Come back tomorrow for another sequence 😉</p>

					<ShareOnTwitterButton tweet={tweetText} />
				</ResultsContainer>
			</Modal>

			{showButton && (
				<Button
					text="SHOW RESULT"
					onClick={() => setShowResults(true)}
					style={{ marginTop: "1rem" }}
				/>
			)}
		</>
	);
};

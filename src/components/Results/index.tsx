import Modal from "react-modal";
import { ShareOnTwitterButton } from "./ShareOnTwitterButton";
import { ResultsContainer } from "./style";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Button } from "../Button";

export const Results = () => {
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
					{playedToday === "victory" && <h3>You won! 🎉</h3>}
					{playedToday === "defeat" && (
						<h3>Sorry but not this time! 😔</h3>
					)}

					<p>Come back tomorrow for another sequence 😉</p>

					<ShareOnTwitterButton tweet={tweetText} />
				</ResultsContainer>
			</Modal>

			{showButton && (
				<Button
					text="SHOW RESULT"
					onClick={() => setShowResults(true)}
					style={{ margin: "1rem auto" }}
				/>
			)}
		</>
	);
};

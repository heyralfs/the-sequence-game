import { ShareOnTwitterButton } from "./ShareOnTwitterButton";
import { ResultsContainer } from "./style";

interface ResultsProps {
	results: string[][];
	playedToday: "victory" | "defeat" | null;
}

export const Results = ({ playedToday, results }: ResultsProps) => {
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

	return (
		<ResultsContainer>
			{playedToday === "victory" && <h3>You won! 🎉</h3>}
			{playedToday === "defeat" && <h3>Sorry but not this time! 😔</h3>}

			<p>Come back tomorrow for another sequence 😉</p>

			<ShareOnTwitterButton tweet={tweetText} />
		</ResultsContainer>
	);
};

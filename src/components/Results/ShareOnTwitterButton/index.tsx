import { SiTwitter } from "react-icons/si";
import { useSequenceContext } from "../../../contexts/SequenceContext";
import { StyledShareButton } from "./style";

export const ShareOnTwitterButton = () => {
	const { results, playedToday } = useSequenceContext();

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
		<StyledShareButton
			href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				tweetText
			)}`}
			target="_blank"
			rel="noreferrer"
		>
			<SiTwitter /> Share on Twitter
		</StyledShareButton>
	);
};

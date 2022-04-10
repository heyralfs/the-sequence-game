import { useSequenceContext } from "../../contexts/SequenceContext";
import { ShareOnTwitterButton } from "./ShareOnTwitterButton";
import { ResultsContainer } from "./style";

export const Results = () => {
	const { playedToday } = useSequenceContext();

	return (
		<ResultsContainer>
			{playedToday === "victory" && <h3>You won! 🎉</h3>}
			{playedToday === "defeat" && <h3>Sorry but not this time! 😔</h3>}

			<p>Come back tomorrow for another sequence 😉</p>

			<ShareOnTwitterButton />
		</ResultsContainer>
	);
};

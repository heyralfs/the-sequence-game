import type { NextPage } from "next";
import { useRef } from "react";
import { AttemptField } from "./components/AttemptField";
import { useSequenceContext } from "./contexts/SequenceContext";

const Home: NextPage = () => {
	const { currentAttempt } = useSequenceContext();

	const attemptRef1 = useRef<HTMLButtonElement>(null);
	const attemptRef2 = useRef<HTMLButtonElement>(null);
	const attemptRef3 = useRef<HTMLButtonElement>(null);
	const attemptRef4 = useRef<HTMLButtonElement>(null);
	const attemptRef5 = useRef<HTMLButtonElement>(null);

	const attempts = [
		attemptRef1,
		attemptRef2,
		attemptRef3,
		attemptRef4,
		attemptRef5,
	];

	const handleAttempt = () => {
		attempts[currentAttempt - 1].current?.click();
	};

	return (
		<div>
			<h1 style={{ textAlign: "center", fontSize: "3rem" }}>
				SEQUENCE #1
			</h1>

			<AttemptField attemptNumber={1} ref={attemptRef1} />

			<AttemptField attemptNumber={2} ref={attemptRef2} />

			<AttemptField attemptNumber={3} ref={attemptRef3} />

			<AttemptField attemptNumber={4} ref={attemptRef4} />

			<AttemptField attemptNumber={5} ref={attemptRef5} />

			<button
				type="button"
				onClick={handleAttempt}
				disabled={currentAttempt > 5}
			>
				SUBMIT
			</button>
		</div>
	);
};

export default Home;

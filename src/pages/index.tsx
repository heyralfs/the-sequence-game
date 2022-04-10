import type { NextPage } from "next";
import { useRef } from "react";
import Modal from "react-modal";

import { AttemptField } from "../components/AttemptField";
import { Button } from "../components/Button";
import { Results } from "../components/Results";
import { useSequenceContext } from "../contexts/SequenceContext";

const Home: NextPage = () => {
	const { currentAttempt, playedToday } = useSequenceContext();

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
		<>
			<div style={{ width: "420px", margin: "auto" }}>
				<h1 style={{ textAlign: "center", fontSize: "3rem" }}>
					SEQUENCE #1
				</h1>

				<AttemptField attemptNumber={1} ref={attemptRef1} />

				<AttemptField attemptNumber={2} ref={attemptRef2} />

				<AttemptField attemptNumber={3} ref={attemptRef3} />

				<AttemptField attemptNumber={4} ref={attemptRef4} />

				<AttemptField attemptNumber={5} ref={attemptRef5} />

				<Button
					text="SUBMIT"
					type="button"
					onClick={handleAttempt}
					disabled={currentAttempt > 5}
				/>
			</div>

			<Modal
				isOpen={!!playedToday}
				className="modal"
				overlayClassName="modal-overlay"
			>
				<Results />
			</Modal>
		</>
	);
};

export default Home;

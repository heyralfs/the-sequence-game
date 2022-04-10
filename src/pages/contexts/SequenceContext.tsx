import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

type Sequence = string[];
type AttemptResult = string[];
type Results = AttemptResult[];

const initialAttemptResult: AttemptResult = ["", "", "", "", ""];
const initialResults: Results = [
	initialAttemptResult,
	initialAttemptResult,
	initialAttemptResult,
	initialAttemptResult,
	initialAttemptResult,
];

interface SequenceContextProps {
	sequence: Sequence;
	currentAttempt: number;
	verifyAttempt: (attempt: Sequence) => void;
	results: Results;
}

interface ProviderProps {
	children: ReactNode;
}

const SequenceContext = createContext({} as SequenceContextProps);

export const SequenceContextProvider = ({ children }: ProviderProps) => {
	const sequence: Sequence = ["1", "2", "3", "4", "5"];

	const [currentAttempt, setCurrentAttempt] = useState(1);
	const [results, setResults] = useState(initialResults);

	function verifyAttempt(attempt: Sequence) {
		if (attempt.includes("")) {
			toast.error("Hey, the sequence must have 5 numbers!", {
				icon: "😅",
				toastId: "error-toast",
			});
		} else if (currentAttempt <= 5) {
			let playerWon = true;

			const attemptResult: AttemptResult = sequence.map((n, i) => {
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
					toast.success("NICE JOB, YOU WON!!!", {
						icon: "🎉",
					});
				}, 5 * 400);
			} else {
				setCurrentAttempt((current) => current + 1);
			}
		}
	}

	return (
		<SequenceContext.Provider
			value={{ sequence, currentAttempt, verifyAttempt, results }}
		>
			{children}
		</SequenceContext.Provider>
	);
};

export const useSequenceContext = () => useContext(SequenceContext);

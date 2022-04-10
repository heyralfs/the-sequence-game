import {
	createContext,
	Dispatch,
	ReactNode,
	useContext,
	useState,
} from "react";
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
	setSequence: Dispatch<Sequence>;
	currentAttempt: number;
	verifyAttempt: (attempt: Sequence) => void;
	results: Results;
	playedToday: "victory" | "defeat" | null;
}

interface ProviderProps {
	children: ReactNode;
}

const SequenceContext = createContext({} as SequenceContextProps);

export const SequenceContextProvider = ({ children }: ProviderProps) => {
	const [sequence, setSequence] = useState<Sequence>([]);

	const [currentAttempt, setCurrentAttempt] = useState(1);
	const [results, setResults] = useState(initialResults);

	const [playedToday, setPlayedToday] = useState<"victory" | "defeat" | null>(
		null
	);

	function verifyAttempt(attempt: Sequence) {
		if (attempt.includes("")) {
			toast.error("Hey, the sequence must have 5 numbers!", {
				icon: "😅",
				toastId: "error-toast",
			});
			return;
		}

		if (currentAttempt <= 5) {
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
					setPlayedToday("victory");
				}, 5 * 400);
			} else if (currentAttempt === 5) {
				setCurrentAttempt(6);

				setTimeout(() => {
					setPlayedToday("defeat");
				}, 5 * 400);
			} else {
				setCurrentAttempt((current) => current + 1);
			}
		}
	}

	return (
		<SequenceContext.Provider
			value={{
				sequence,
				setSequence,
				currentAttempt,
				verifyAttempt,
				results,
				playedToday,
			}}
		>
			{children}
		</SequenceContext.Provider>
	);
};

export const useSequenceContext = () => useContext(SequenceContext);

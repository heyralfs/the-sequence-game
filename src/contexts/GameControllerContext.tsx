import { createContext, useContext, ReactNode, useState, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { checkAttempt, getUniqueValues, initialValuesAdapter } from "../utils";
import { localStorageHandlers } from "../services";

type Result = "correct" | "partial" | "incorrect";

interface GameProveiderProps {
	children: ReactNode;
	sequence: number[];
	initialValues: number[][];
	gameAlreadyFullyPlayed: boolean;
}

interface GameControllerContextValues {
	attemptNumber: number;
	focusedInputIndex: number;
	attempts: (number | null)[][];
	results: Result[][];

	onFocusChange: (inputIndex: number) => void;
	onNumberClick: (value: number) => void;
	onBackspaceClick: () => void;
	onSubmit: () => void;

	showResults: () => void;
	hideResults: () => void;
	isResultsOpen: boolean;
}

const GameControllerContext = createContext<GameControllerContextValues>(
	{} as GameControllerContextValues
);

export const GameControllerProvider = ({
	sequence,
	initialValues,
	gameAlreadyFullyPlayed,
	children,
}: GameProveiderProps) => {
	const toast = useToast();

	const [attemptNumber, setAttemptNumber] = useState(
		gameAlreadyFullyPlayed ? 6 : initialValues.length + 1
	);
	const [focusedInputIndex, setFocusedInputIndex] = useState(0);

	const [attempts, setAttempts] = useState<(number | null)[][]>(
		initialValuesAdapter(initialValues)
	);

	const [results, setResults] = useState<Result[][]>(
		initialValues.map((values) => checkAttempt(sequence, values).result)
	);

	const [isResultsOpen, setIsResultsOpen] = useState(false);

	function showResults() {
		setIsResultsOpen(true);
	}

	function hideResults() {
		setIsResultsOpen(false);
	}

	function onFocusChange(inputIndex: number) {
		setFocusedInputIndex(inputIndex);
	}

	function onNumberClick(value: number) {
		if (attemptNumber > 5) return;

		const updatedAttempts = [...attempts];
		updatedAttempts[attemptNumber - 1][focusedInputIndex] = value;
		setAttempts(updatedAttempts);
		setFocusedInputIndex((prev) => prev + 1);
	}

	function onBackspaceClick() {
		if (attemptNumber > 5) return;

		const updatedAttempts = [...attempts];
		// if focused input has value
		if (updatedAttempts[attemptNumber - 1][focusedInputIndex] !== null) {
			updatedAttempts[attemptNumber - 1][focusedInputIndex] = null;
		} else {
			updatedAttempts[attemptNumber - 1][focusedInputIndex - 1] = null;
			setFocusedInputIndex((prev) => (prev > 0 ? prev - 1 : prev));
		}
		setAttempts(updatedAttempts);
	}

	const isSubmitting = useRef(false);

	function onSubmit() {
		if (isSubmitting.current || attemptNumber > 5) return;

		const currentAttempt = attempts[attemptNumber - 1].filter(
			(x) => x !== null
		) as number[];

		// validate empty fields
		if (currentAttempt.length < 5) {
			return toast({
				description: "the sequence must have 5 numbers",
				status: "info",
				position: "top",
			});
		}

		// validate unique values
		if (getUniqueValues(currentAttempt).length < 5) {
			return toast({
				description: "the sequence contains repeating numbers",
				status: "info",
				position: "top",
			});
		}

		isSubmitting.current = true;

		// check result
		const { result, playerWon } = checkAttempt(sequence, currentAttempt);
		setResults((prev) => [...prev, result]);

		if (playerWon) {
			localStorageHandlers.setGameOver({
				lastAttemptNumber: results.length,
				lastTry: currentAttempt,
				won: true,
			});
			return setTimeout(() => {
				setAttemptNumber(6);
				setFocusedInputIndex(-1);
				showResults();
			}, 5 * 500);
		}

		if (attemptNumber > 4) {
			localStorageHandlers.setGameOver({
				lastAttemptNumber: results.length,
				lastTry: currentAttempt,
				won: false,
			});
			setTimeout(showResults, 5 * 500);
		}

		localStorageHandlers.updateTries(currentAttempt);

		setTimeout(() => {
			setAttemptNumber((prev) => prev + 1);
			setFocusedInputIndex(0);
			isSubmitting.current = false;
		}, 5 * 500);
	}

	return (
		<GameControllerContext.Provider
			value={{
				attemptNumber,
				focusedInputIndex,
				attempts,
				results,
				onFocusChange,
				onNumberClick,
				onBackspaceClick,
				onSubmit,
				showResults,
				hideResults,
				isResultsOpen,
			}}
		>
			{children}
		</GameControllerContext.Provider>
	);
};

export const useGameController = () => useContext(GameControllerContext);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
	localStorageHandlers,
	LocalStorageObject,
} from "../utils/localStorageHandlers";

const maximumAttempts = 5;

interface GameState {
	sequence: string[];
	tries: string[][];
	results: string[][];
	playedToday: "victory" | "defeat" | null;
}

type GuessPayload = {
	attempt: string[];
};

type SetInitialPayload = {
	sequence: string[];
	game: LocalStorageObject;
};

const initialState: GameState = {
	sequence: [],
	tries: [],
	results: [],
	playedToday: null,
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setSequence: (state, action) => {
			state.sequence = action.payload;
		},
		tryToGuess: (state, action: PayloadAction<GuessPayload>) => {
			const { attempt } = action.payload;
			const { sequence } = state;

			if (attempt.includes("")) {
				toast.error("Hey, the sequence must have 5 numbers!", {
					icon: "😅",
					toastId: "error-toast",
				});
				return;
			}

			if (state.results.length <= maximumAttempts) {
				let playerWon = true;

				const attemptResult: string[] = sequence.map((n, i) => {
					if (attempt[i] === n) {
						return "correct";
					} else if (sequence.includes(attempt[i])) {
						playerWon = false;
						return "partial";
					}
					playerWon = false;
					return "incorrect";
				});

				state.results.push(attemptResult);

				if (playerWon) {
					state.playedToday = "victory";
					localStorageHandlers.setGameOver({
						lastAttemptNumber: state.results.length,
						lastTry: attempt,
						won: true,
					});
				} else if (state.results.length === maximumAttempts) {
					state.playedToday = "defeat";
					localStorageHandlers.setGameOver({
						lastAttemptNumber: state.results.length,
						lastTry: attempt,
						won: false,
					});
				} else {
					localStorageHandlers.updateTries(attempt);
				}
			}
		},
		setInitialValues: (state, action: PayloadAction<SetInitialPayload>) => {
			const { state: currentGameState } = action.payload.game;
			const { sequence } = action.payload;

			state.tries = currentGameState.tries;

			const results = currentGameState.tries.map((attempt) => {
				return sequence.map((n, i) => {
					if (attempt[i] === n) {
						return "correct";
					} else if (sequence.includes(attempt[i])) {
						return "partial";
					}
					return "incorrect";
				});
			});

			state.results = results;

			if (currentGameState.gameOver) {
				state.playedToday = currentGameState.won ? "victory" : "defeat";
			}
		},
	},
});

export const { setSequence, tryToGuess, setInitialValues } = gameSlice.actions;

export default gameSlice.reducer;

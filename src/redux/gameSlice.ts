import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
				state.tries.push(attempt);

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
				} else if (state.results.length === maximumAttempts) {
					state.playedToday = "defeat";
				}
			}
		},
	},
});

export const { setSequence, tryToGuess } = gameSlice.actions;

export default gameSlice.reducer;

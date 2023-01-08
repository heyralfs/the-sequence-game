export function checkAttempt(sequence: number[], attempt: number[]) {
	let playerWon = true;
	const result = sequence.map((n, index) => {
		if (attempt[index] === n) {
			return "correct";
		}
		if (sequence.includes(attempt[index]!)) {
			playerWon = false;
			return "partial";
		}
		playerWon = false;
		return "incorrect";
	});

	return { result, playerWon };
}

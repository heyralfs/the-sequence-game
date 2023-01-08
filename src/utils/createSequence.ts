export function createSequence(): number[] {
	let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	let sequence: number[] = [];

	for (let i = 1; i < 6; i++) {
		const base = Math.floor(Math.random() * (11 - i));
		sequence[i - 1] = possibleNumbers[base];

		possibleNumbers.splice(base, 1);
	}

	return sequence;
}

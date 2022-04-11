export interface LocalStorageObject {
	stats: {
		games: number;
		wins: number;
		histo: number[];
	};
	state: {
		lastGame: number;
		tries: string[][];
		gameOver: 1 | 0;
		won: 1 | 0;
	};
}

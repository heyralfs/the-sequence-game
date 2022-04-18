import React from "react";
import { StatsBar, StatsBoardContainer } from "./style";

type StatsType = {
	wins: number;
	games: number;
	histo: number[];
};

interface StatsBoardProps {
	stats?: StatsType;
}

const StatsBoard = ({ stats }: StatsBoardProps) => {
	if (!stats) return null;

	const { games, histo, wins } = stats;

	const winsPercentage = Math.round((wins * 100) / games);

	const histoPercentage = histo.map((value) =>
		Math.round((value * 100) / games)
	);
	console.log({ histoPercentage });

	return (
		<StatsBoardContainer>
			<div className="wins-percentage">
				<div>
					<h1>{games}</h1>
					<p>Games</p>
				</div>
				<div>
					<h1>{winsPercentage}%</h1>
					<p>Wins</p>
				</div>
			</div>

			<h3>Distribution of attempts:</h3>

			{histo.map((value, index) => (
				<StatsBar value={histoPercentage[index]} key={index}>
					<p>{index < 5 ? index + 1 : "☠️"}</p>

					<div>{value}</div>
				</StatsBar>
			))}
		</StatsBoardContainer>
	);
};

export default StatsBoard;

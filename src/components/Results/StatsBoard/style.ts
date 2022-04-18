import styled from "styled-components";

export const StatsBoardContainer = styled.div`
	h3 {
		text-align: center;
	}

	.wins-percentage {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 24px;

		h1,
		p {
			margin: 0;
			text-align: center;
		}

		h1 {
			font-size: 2.5rem;
		}
	}
`;

interface StatsBarProps {
	value: number;
}

export const StatsBar = styled.div<StatsBarProps>`
	display: flex;
	align-items: center;
	font-weight: bold;
	padding: 2px 0;

	p {
		margin: 0 4px 4px 0;
		width: 25px;
		text-align: end;
	}

	div {
		display: inline-block;
		min-width: 16px;
		width: ${(props) => `${props.value}%`};
		margin-bottom: 4px;
		background-color: var(--off-white);
		color: var(--dark-blue);
		padding: 0 4px;
		text-align: end;
	}
`;

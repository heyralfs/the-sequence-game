import styled from "styled-components";

export const StyledInput = styled.input`
	width: 80px;
	height: 80px;

	border: 1px solid var(--faded-white);
	border-radius: 12px;

	color: var(--off-white);
	background-color: var(--faded-white);

	text-align: center;
	font-size: 50px;
	font-weight: bold;

	&.incorrect {
		border: 1px solid var(--red);
		color: var(--red);
	}

	&.partial {
		border: 1px solid var(--yellow);
		color: var(--yellow);
	}

	&.correct {
		border: 1px solid var(--green);
		color: var(--green);
	}

	-webkit-transition: border 400ms linear, color 400ms linear;
	-moz-transition: border 400ms linear, color 400ms linear;
	transition: border 400ms linear, color 400ms linear;

	&:nth-of-type(2) {
		transition-delay: 400ms;
	}
	&:nth-of-type(3) {
		transition-delay: calc(2 * 400ms);
	}
	&:nth-of-type(4) {
		transition-delay: calc(3 * 400ms);
	}
	&:nth-of-type(5) {
		transition-delay: calc(4 * 400ms);
	}
`;

import styled from "styled-components";

export const StyledInput = styled.input`
	width: 80px;
	height: 80px;

	border: 1px solid rgba(255, 255, 255, 0.15);
	border-radius: 12px;

	color: var(--off-white);
	background-color: rgba(255, 255, 255, 0.15);

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

	-webkit-transition: border 500ms linear, color 500ms linear;
	-moz-transition: border 500ms linear, color 500ms linear;
	transition: border 500ms linear, color 500ms linear;

	&:nth-of-type(2) {
		transition-delay: 500ms;
	}
	&:nth-of-type(3) {
		transition-delay: 1000ms;
	}
	&:nth-of-type(4) {
		transition-delay: 1500ms;
	}
	&:nth-of-type(5) {
		transition-delay: 2000ms;
	}
`;

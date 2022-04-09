import styled from "styled-components";

export const StyledInput = styled.input`
	width: 80px;
	height: 80px;

	border: none;
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
`;

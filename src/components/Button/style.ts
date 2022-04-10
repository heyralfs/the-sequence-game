import styled from "styled-components";

export const StyledButton = styled.button`
	width: 100%;
	height: 50px;
	margin-top: 16px;

	border-radius: 8px;
	border: none;
	outline: none;

	background-color: var(--green);
	color: var(--off-white);
	font-weight: bold;
	letter-spacing: 1px;
	font-size: 1.2rem;

	cursor: pointer;

	&:disabled {
		background-color: var(--faded-white);
		color: var(--dark-blue);
		cursor: not-allowed;
	}
`;

import styled from "styled-components";

export const StyledButton = styled.button`
	width: 100%;
	aspect-ratio: 7 / 1;
	margin-top: 16px;

	border-radius: 8px;
	border: none;
	outline: none;

	background-color: var(--green);
	color: var(--off-white);
	font-weight: bold;
	letter-spacing: 1px;
	font-size: 1.2rem;
	@media (max-width: 375px) {
		font-size: 1rem;
	}

	cursor: pointer;

	&:disabled {
		background-color: var(--faded-white);
		color: var(--dark-blue);
		cursor: not-allowed;
	}
`;

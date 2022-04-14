import styled from "styled-components";

export const Form = styled.form`
	width: 100%;
`;

export const AttemptLine = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 6px;

	margin: 12px 0;

	input {
		width: 100%;
		aspect-ratio: 1;

		cursor: pointer;

		&:disabled {
			cursor: not-allowed;
		}
	}
`;

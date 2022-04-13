import styled from "styled-components";

export const AttemptLine = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 6px;

	margin: 12px 0;

	input {
		cursor: pointer;
		&:disabled {
			cursor: not-allowed;
		}
	}
`;

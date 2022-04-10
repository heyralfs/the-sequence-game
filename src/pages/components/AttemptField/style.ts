import styled from "styled-components";

interface AttemptBoardProps {
	disabledPointerEvents: boolean;
}

export const AttemptBoard = styled.div<AttemptBoardProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 6px;

	margin: 12px 0;
	pointer-events: ${(props) =>
		props.disabledPointerEvents ? "none" : "all"};

	input {
		cursor: pointer;
	}
`;

import styled from "styled-components";

export const StyledFooter = styled.footer`
	width: 100%;
	height: 100px;
	margin-top: 16px;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 8px;

	color: var(--off-white);
	border-top: 1px solid var(--faded-white);

	p {
		margin: 0;
	}

	.tech-icons {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
	}
`;

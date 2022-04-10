import styled from "styled-components";

export const StyledFooter = styled.footer`
	position: absolute;
	bottom: 0;

	width: 100%;
	padding: 16px 0;

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

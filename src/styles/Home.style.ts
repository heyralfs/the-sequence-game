import styled from "styled-components";

export const Board = styled.div`
	width: 100%;
	max-width: 400px;
	min-height: calc(100vh - 116px); // footer height compensation

	margin: 0 auto;
	padding: 0 16px;
`;

export const Title = styled.h1`
	text-align: center;
	font-size: 2.5rem;
`;

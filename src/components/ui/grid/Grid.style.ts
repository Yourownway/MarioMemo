import styled from "styled-components";

export const DynamicGrid = styled.div`
	margin: 0 auto;
	width: auto;
	height: 80vh;
	display: grid;
	grid-template-columns: ${(p: any) =>
		p.level ? `repeat(${p.level * 4}, 1fr)` : ""};
	grid-gap: 1px;
	grid-auto-rows: minmax(10px, auto);
`;
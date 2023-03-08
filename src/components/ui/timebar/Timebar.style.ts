import styled from "styled-components";
import { IProgress } from "./type";

export const Container = styled.div`
	height: 30px;
	width: 60%;
	min-width: 600px;
	position: absolute;
	bottom: 18px;
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: 1;
`;
export const BaseBox = styled.div`
	border-radius: 12px;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
`;

export const Background = styled(BaseBox)`
	background: #f8efef;
	width: 100%;
`;
export const Progress = styled(BaseBox)<IProgress>`
	/* background: repeating-linear-gradient(45deg,blue,white 12px); */
	background-color: rgb(10, 186, 250);
	background-color: ${({ timeLeft }) =>
		timeLeft > 10 ? "rgb(10, 186, 250)" : "rgb(249, 63, 55)"};
	width: ${({ timeLeft }) => `${timeLeft}%`};
	border-radius: ${({ timeLeft }) =>
		timeLeft > 98 ? "12px" : "12px 0px 0px 12px "};
`;
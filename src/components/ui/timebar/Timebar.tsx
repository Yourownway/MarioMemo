import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/UseStore";
import {
	gameState as gameSlice, updateTimeLeft
} from "../../../store/slice/gameSlice";
import { uiState } from "../../../store/slice/uiSlice";
interface IProgress {
	readonly timeLeft: number;
}

const Container = styled.div`
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
const BaseBox = styled.div`
	border-radius: 12px;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
`;

const Background = styled(BaseBox)`
	background: #f8efef;
	width: 100%;
`;
const Progress = styled(BaseBox)<IProgress>`
	/* background: repeating-linear-gradient(45deg,blue,white 12px); */
	background-color: rgb(10, 186, 250);
	background-color: ${({ timeLeft }) =>
		timeLeft > 10 ? "rgb(10, 186, 250)" : "rgb(249, 63, 55)"};
	width: ${({ timeLeft }) => `${timeLeft}%`};
	border-radius: ${({ timeLeft }) =>
		timeLeft > 98 ? "12px" : "12px 0px 0px 12px "};
`;

interface P {
	timeLeft: number;
	decrementTimeLeft: () => void;
}

function Timebar({ timeLeft,decrementTimeLeft }: P) {
	const { isPlaying } = useAppSelector(gameSlice);
	const dispatch = useAppDispatch();


	

	useEffect(() => {
		if (!isPlaying) return;
		let timer = setInterval(() => decrementTimeLeft(), 1000);
		if (timeLeft <= 0) return clearInterval(timer);
		return () => {
			clearInterval(timer);
		};
	}, [timeLeft, isPlaying]);
;
	return (
		<Container>
			<Background className="animate__bounceIn animate__animated" />
			<Progress
				className="animate__bounceIn animate__animated"
				{...{ timeLeft: (timeLeft / 600) * 100 }}
			/>
		</Container>
	);
}

export default Timebar;

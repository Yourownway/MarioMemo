import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
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
// @ts-ignore

function Timebar({ timeLeft,decrementTimeLeft }: P) {
	const { isPlaying } = useSelector(gameSlice);
	const dispatch = useDispatch();

    useEffect(() => {
	  
	
	  return () => {
		dispatch(updateTimeLeft({time: timeLeft}))
	  }
	}, [])
	

	useEffect(() => {
		if (!isPlaying) return;
		if (timeLeft <= 0) return;
		let timer = setInterval(() => decrementTimeLeft(), 1000);
		return () => {
			// @ts-ignore
			clearInterval(timer);
		};
	}, [timeLeft, isPlaying]);

	useEffect(() => {
		if (timeLeft <= 0) {
			// @ts-ignore
			clearInterval(timer);
		}
	}, [timeLeft]);
	return (
		<Container>
			<Background className="animate__bounceIn animate__animated" />
			{/* @ts- ignore */}
			<Progress
				className="animate__bounceIn animate__animated"
				{...{ timeLeft: (timeLeft / 600) * 100 }}
			/>
		</Container>
	);
}

export default Timebar;

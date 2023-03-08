import React, { useEffect } from "react";
import { useAppSelector } from "../../../hooks/store/UseStore";
import {
	gameState as gameSlice, updateTimeLeft
} from "../../../store/slice/gameSlice";
import { Background, Container, Progress } from "./Timebar.style";
import { IProgressProps } from "./type";


function Timebar({ timeLeft,decrementTimeLeft }: IProgressProps) {
	const { isPlaying } = useAppSelector(gameSlice);

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

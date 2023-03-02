import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Grid from "../ui/grid/Grid";
import Timebar from "../ui/timebar/Timebar";
import "animate.css";
import { EAction } from "../ui/modals/type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiState as uiSlice, handleOpenModal, handleCountDownIsActive } from "../../store/slice/uiSlice";
import {
	gameState as gameSlice,
	handleIsPlaying,handleIsResumeActive
} from "../../store/slice/gameSlice";
import UseExit from "../../hooks/event/UseExit";

const GamePage: React.FC = () => {
	console.log("render")
	const dispatch = useDispatch();
	const uiState = useSelector(uiSlice);
	const gameState = useSelector(gameSlice);
	const exitEvent = UseExit()
    const [countDown, setCountDown] = useState(3);
	const countRef = useRef(null);
	let navigate = useNavigate();

	useEffect(() => {
		if (!gameState.isResumeActive)
			dispatch(handleIsResumeActive({ bool: true }));
	}, [])
	
	//@ts-ignore
	const displayColorCountDown = (count, ref) => {
		if (!ref || !count) return;
		switch (count) {
			case 3:
				ref.current.style.color = "rgb(10, 186, 250)";
				break;
			case 2:
				ref.current.style.color = "rgb(240, 196, 54)";
				break;
			case 1:
				ref.current.style.color = "rgb(249, 63, 55)";

				break;

			default:
				break;
		}
	};
	useLayoutEffect(() => {
		if(uiState.modalState.isActive) return
		if (countDown < 1 ) {
	     //prevent initGrid animation
		  
			setTimeout(() => {
				dispatch(handleIsPlaying({ bool: true }));
			}, 2000);
			return
		}
		 if (gameState.isPlaying) {
			dispatch(handleIsPlaying({ bool: false }));
		}	
		displayColorCountDown(countDown, countRef);
		const timer = setInterval(() => {
			setCountDown((prev) => prev - 1);
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, [countDown,uiState.modalState.isActive]);

	return (
		<div className="gamePage_container">
			{countDown > 0 ? (
				<div className="countDown_container">
					<h1 ref={countRef}>{countDown}</h1>
				</div>
			) : (
				<>
					<Grid />
					<Timebar />
				</>
			)}
		</div>
	);
};
export default GamePage;

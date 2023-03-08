import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Grid from "../ui/grid/Grid";
import "animate.css";
import { handleCountDownIsActive } from "../../store/slice/uiSlice";
import {
	gameState as gameSlice,
	handleIsPlaying,handleIsResumeActive
} from "../../store/slice/gameSlice";
import UseExit from "../../hooks/event/UseExit";
import { handleStep } from "../../store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store/UseStore";

interface IGamePage {
	isResumeMenu:boolean;
}

const GamePage: React.FC<IGamePage> = ({isResumeMenu}) => {
	const dispatch = useAppDispatch();
	const gameState = useAppSelector(gameSlice);
	// eslint-disable-next-line
	const exitEvent = UseExit()
    const [countDown, setCountDown] = useState(3);
	const countRef = useRef(null);


	useEffect(() => {
		dispatch(handleStep({step:"game"}))
		if (isResumeMenu && !gameState.isResumeActive)
			dispatch(handleIsResumeActive({ bool: true }));
	}, [isResumeMenu,gameState.isResumeActive,dispatch])
	
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
		
		if (countDown < 1 ) {
	     //prevent initGrid animation
		 setTimeout(() => {
			 dispatch(handleCountDownIsActive({ isActive: false }));
			 dispatch(handleIsPlaying({ bool: true }));
			 dispatch(handleIsResumeActive({ bool: true }));
			}, 2000);
			return
		}
		dispatch(handleCountDownIsActive({ isActive: true }));
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
	}, [countDown,dispatch,gameState.isPlaying]);

	return (
		<div className="gamePage_container">
			{countDown > 0 ? (
				<div className="countDown_container">
					<h1 ref={countRef}>{countDown}</h1>
				</div>
			) : (
				<>
					<Grid  isResumeMenu={isResumeMenu}/>
				</>
			)}
		</div>
	);
};
export default GamePage;

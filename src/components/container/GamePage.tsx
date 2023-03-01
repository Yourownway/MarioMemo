import React, { useEffect, useRef, useState } from "react";
import Grid from "../ui/grid/Grid";
import Timebar from "../ui/timebar/Timebar";
import "animate.css";
import { EAction } from "../ui/modals/type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiState as uiSlice, handleOpenModal } from "../../store/slice/uiSlice";
import {
	gameState as gameSlice,
	handleIsPlaying,
} from "../../store/slice/gameSlice";

const GamePage: React.FC = () => {
	const dispatch = useDispatch();
	const uiState = useSelector(uiSlice);
	const gameState = useSelector(gameSlice);

    const [countDown, setCountDown] = useState(3);
	const countRef = useRef(null);
	let navigate = useNavigate();
	const onExit = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			dispatch(handleIsPlaying({ bool: false }));
			dispatch(
				handleOpenModal({ isActive: true, modalAction: EAction.EXIT })
			);
		}
	};
	useEffect(() => {
		window.addEventListener("keydown", onExit);
		return () => {
			window.removeEventListener("keydown", onExit);
		};
	}, [onExit]);

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
	useEffect(() => {
		if (countDown < 1 && !gameState.isPlaying) {
			dispatch(handleIsPlaying({ bool: true }));
		    return
        }
		displayColorCountDown(countDown, countRef);
		const timer = setInterval(() => {
			setCountDown((prev) => prev - 1);
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, [countDown]);

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

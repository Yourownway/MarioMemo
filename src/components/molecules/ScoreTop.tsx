import React, { useEffect, useState } from "react";
import { userState as userSlice } from "../../store/slice/userSlice";
import { uiState as uiSlice, handleOpenModal} from "../../store/slice/uiSlice";
import { gameState as gameSlice, updateTimeLeft } from "../../store/slice/gameSlice";
import { secondsToMinutesAndSeconds } from "../../store/utils/timer";
import { EAction } from "../ui/modals/type";
import Timebar from "../ui/timebar/Timebar";
import { useAppDispatch, useAppSelector } from "../../hooks/store/UseStore";

const ScoreTop: React.FC = () => {
	const userState = useAppSelector(userSlice);
	const gameState = useAppSelector(gameSlice);
	const uiState = useAppSelector(uiSlice);
    const dispatch = useAppDispatch()
	const [time, setTime] = useState(gameState.timeLeft)

	
	useEffect(() => { 
		if ( gameState.timeLeft !== time )
		setTime(gameState.timeLeft)
		// eslint-disable-next-line
	}, [gameState.timeLeft])

	useEffect(() => {
		dispatch(updateTimeLeft({ time })) 
		// eslint-disable-next-line
	}, [userState.step,dispatch])
	
	const decrementTimeLeft = () => {
		setTime(current => current - 1)
	}

	return (
		<>

		<div className="scoreTop_container">
			<p className={userState.step === "start" ?"pointer" : ""} onClick={()=>
             {   if (userState.step === "start")
					dispatch(
						handleOpenModal({
							isActive: true,
							modalAction: EAction.USERNAME,
						})
					);}}>
            {userState.name}</p>
			{(gameState.initTime > gameState.timeLeft && gameState.timeLeft > 0 && gameState.isResumeActive) || gameState.isPlaying ? (
				<div className="animate__bounceIn animate__animated">
					<p>LVL: {gameState.level}</p>
					<p>TIME: {secondsToMinutesAndSeconds(time)}</p>
				</div>
			) : (
				<div></div>
			)}
		</div>
		{ userState.step === "game" &&  !uiState.countDownState.isActive && <Timebar timeLeft={time} decrementTimeLeft={decrementTimeLeft} />}
		</>
	);
};

export default ScoreTop;

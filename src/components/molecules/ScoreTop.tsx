import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userState as userSlice } from "../../store/slice/userSlice";
import { uiState as uiSlice, handleOpenModal} from "../../store/slice/uiSlice";
import { gameState as gameSlice, updateTimeLeft } from "../../store/slice/gameSlice";
import { secondsToMinutesAndSeconds } from "../../store/utils/timer";
import { EAction } from "../ui/modals/type";
import Timebar from "../ui/timebar/Timebar";

const ScoreTop: React.FC = () => {
	const userState = useSelector(userSlice);
	const gameState = useSelector(gameSlice);
	const uiState = useSelector(uiSlice);
    const dispatch = useDispatch()
	const [time, setTime] = useState(gameState.timeLeft)
	

	useEffect(() => { 
		if (time != gameState.timeLeft)
			setTime(gameState.timeLeft)
	}, [gameState.timeLeft])

	useEffect(() => {
		dispatch(updateTimeLeft({ time }))
	}, [userState.step])
	
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

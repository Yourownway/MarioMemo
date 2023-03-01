import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userState as userSlice } from "../../store/slice/userSlice";

import { uiState as uiSlice, handleOpenModal} from "../../store/slice/uiSlice";
import { gameState as gameSlice } from "../../store/slice/gameSlice";
import { secondsToMinutesAndSeconds } from "../../store/utils/timer";
import { EAction } from "../ui/modals/type";

const ScoreTop: React.FC = () => {
	const userState = useSelector(userSlice);
	const uiState = useSelector(uiSlice);
	const gameState = useSelector(gameSlice);
    const dispatch = useDispatch()


	return (
		<div className="scoreTop_container">
			<p className={!gameState.isPlaying ?"pointer" : ""} onClick={()=>
             {   if (!gameState.isPlaying)
					dispatch(
						handleOpenModal({
							isActive: true,
							modalAction: EAction.USERNAME,
						})
					);}}>
            {userState.name}</p>
			{gameState.isResumeActive ? (
				<div>
					<p>LVL: {gameState.level}</p>
					<p>TIME: {secondsToMinutesAndSeconds(gameState.timeLeft)}</p>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default ScoreTop;

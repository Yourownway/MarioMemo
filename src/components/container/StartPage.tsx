import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { EAction } from "../ui/modals/type";
import { userState as userSlice,handleStep} from "../../store/slice/userSlice";
import { handleOpenModal } from "../../store/slice/uiSlice";
import { gameState as gameSlice,handleIsPlaying,handleResetGame} from "../../store/slice/gameSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store/UseStore";

const StartPage: React.FC = () => {
    const userState = useAppSelector(userSlice);
    const gameState = useAppSelector(gameSlice);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(handleStep({step:"start"}))
		dispatch(handleIsPlaying({ bool: false }))
	}, [dispatch])

	return (
		<div className="startPage_container">
			<div className="logo_container">
				<img src={logo} alt="logo" />
				<p>memory</p>
			</div>
			<div className="menu_container">
                {(gameState.initTime > gameState.timeLeft && gameState.timeLeft > 0 && gameState.isResumeActive) &&
                    	<Link to="/game/resume" className="selectable">
						{" "}
						<span className="mush_hover"></span> RESUME GAME
					</Link>
                }
				{userState.name ? (
					<Link to="/game" onClick={()=>dispatch(handleResetGame())} className="selectable">
						{" "}
						<span className="mush_hover"></span> NEW GAME
					</Link>
				) : (
					<p
						className="selectable"
						onClick={() =>
							dispatch(
								handleOpenModal({
									isActive: true,
									modalAction: EAction.USERNAME,
								})
							)
						}
					>
						{" "}
						<span className="mush_hover"></span> NEW GAME
					</p>
				)}

				{/* {userState.best.isExists && (
					<p
						className="selectable"
						onClick={() =>
							dispatch(
								handleOpenModal({
									isActive: true,
									modalAction: EAction.BEST,
								})
							)
						}
					>
						{" "}
						<span className="mush_hover"></span> BEST SCORE
					</p>
				)} */}
                
			</div>
		</div>
	);
};

export default StartPage;

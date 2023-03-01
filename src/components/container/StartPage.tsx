import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { EAction } from "../ui/modals/type";
import { useDispatch, useSelector } from "react-redux";
import { userState as userSlice } from "../../store/slice/userSlice";
import { uiState as uiSlice, handleOpenModal } from "../../store/slice/uiSlice";
import { gameState as gameSlice,handleResetGame} from "../../store/slice/gameSlice";

const StartPage: React.FC = () => {
    const userState = useSelector(userSlice);
	const uiState = useSelector(uiSlice);
    const gameState = useSelector(gameSlice);
	const dispatch = useDispatch();

	return (
		<div className="startPage_container">
			<div className="logo_container">
				<img src={logo} />
				<p>memory</p>
			</div>
			<div className="menu_container">
				{/* <p
            className="selectable"
            onClick={() => handleOpenModal(true,EAction.USERNAME)}
        >
            {" "}
            <span className="mush_hover"></span> RESUME GAME
        </p> */}

                {gameState.isResumeActive &&
                    	<Link to="/game" className="selectable">
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

				{userState.best.isExists && (
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
				)}
                
			</div>
		</div>
	);
};

export default StartPage;

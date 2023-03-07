import React, { useEffect, useLayoutEffect, useState } from "react";
import { Border, Wrapper, Content } from "./Modal.style";
// import { IModalProps } from "./type";
import { useDispatch, useSelector } from "react-redux";
import  {userState as userSlice, updateUserName } from "../../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import {
	uiState as uiSlice,
	handleOpenModal,
} from "../../../store/slice/uiSlice";
import {gameState as gameSlice,
	handleIsPlaying,
	
} from "../../../store/slice/gameSlice";
import { secondsToMinutesAndSeconds } from "../../../store/utils/timer";
import { IModalProps } from "./type";

const Modal: React.FC<IModalProps> = (props) => {
	const [render, setRender] = useState(<></>);
	const dispatch = useDispatch();
	const { modalAction, isActive } = useSelector(uiSlice).modalState;
	const gameState = useSelector(gameSlice)
	const {step} = useSelector(userSlice)
	useEffect(() => {
		return () => {
			if (step === "game")
				dispatch(handleIsPlaying({ bool: true }))
			else {
				dispatch(handleIsPlaying({ bool: false }))
			}
		}
	}, [step])

	useLayoutEffect(() => {
		if (!modalAction) return setRender(<></>);

		if (modalAction === "lvlUp") {
			setRender(<ContentLvlUp />);
		}
		if (modalAction === "best") {
			setRender(<ContentNewBest />);
		}
		if (modalAction === "exit") {
			setRender(<ContentExit handleIsOpen={handleIsOpen} />);
		}
		if (modalAction === "userName") {
			setRender(<ContentName handleIsOpen={handleIsOpen} />);
		}
		if (modalAction === "countDown") {
			setRender(<ContentCountDown handleIsOpen={handleIsOpen} />);
		}
		if (modalAction === "gameWin") {
			setRender(<ContentGameWin handleIsOpen={handleIsOpen} />);
		}	
		if (modalAction === "gameOver") {
			setRender(<ContentGameOver handleIsOpen={handleIsOpen} />);
		}
	}, [modalAction]);

	const handleIsOpen = (bool: boolean) => {
		return dispatch(handleOpenModal({ isActive: bool, modalAction }));
	};
	 useEffect(() => {
	 	if (isActive && gameState.isPlaying ) dispatch(handleIsPlaying({ bool: false }));
	 }, [isActive])
	

	return (
		<Wrapper
			onClick={() => {
				if (modalAction === "exit")
					dispatch(handleIsPlaying({ bool: true }));
				    handleIsOpen(false);
			}}
		>
			<Border onClick={(e) => e.stopPropagation()}>
				<Content modalAction={modalAction}>{render}</Content>
			</Border>
		</Wrapper>
	);
};
const ContentGameOver = ({ handleIsOpen }: IContent) => {
	return (
		<div>
			<p>GAME OVER !</p>
		</div>
	);
};
const ContentGameWin = ({ handleIsOpen }: IContent) => {
	const { initTime, timeLeft, level } = useSelector(gameSlice)
	const time = initTime - timeLeft;
	return (
		<div>
			<p>GAME FINISH!</p>
			<p>SCORE:</p>
			<p>LVL {level} TIME {secondsToMinutesAndSeconds(time)}</p>
		</div>
	);
};
const ContentNewBest = () => {
	return (
		<div>
			<p>NEW BEST SCORE !</p>
			<p>LVL 3 TIME 3:24</p>
		</div>
	);
};
const ContentLvlUp = () => {
	return (
		<div>
			<p>LEVEL UP !</p>
			
		</div>
	);
};
const ContentCountDown = ({ handleIsOpen }: IContent) => {
	const [count, setCount] = useState(3);
	useEffect(() => {
		const timer = setInterval(() => {
			setCount((prev) => prev - 1);
		}, 1000);
		if (count < 1) {
			clearInterval(timer);
			handleIsOpen(false);
		}
		return () => {
			clearInterval(timer);
		};
	}, [count]);

	return <div></div>;
};
const ContentExit = ({ handleIsOpen }: IContent) => {
	const [stay, setStay] = useState(true);
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const handleClick = (bool: boolean) => {
		if (bool) {
			navigate("/");
			dispatch(handleIsPlaying({ bool: false }));
			return handleIsOpen(false);
		} else {
			dispatch(handleIsPlaying({ bool: true }));
			return handleIsOpen(false);
		}
	};
	return (
		<div>
			<p>EXIT GAME ?</p>
			<div>
				<p className="selectable" onClick={() => handleClick(true)}>
					{" "}
					<span className="mush_hover"></span> YES
				</p>
				<p className="selectable" onClick={() => handleClick(false)}>
					{" "}
					<span className="mush_hover"></span> NO
				</p>
			</div>
		</div>
	);
};

interface IContent {
	handleIsOpen: (bool: boolean) => void;
}
const ContentName = ({ handleIsOpen }: IContent) => {
	const {name} = useSelector(userSlice)
    const [currentName,setCurrentName] = useState(name)

	const dispatch = useDispatch();
	let navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentName(e.target.value.toUpperCase());
	};
	const handleName = () => {
		if (currentName) {
			dispatch(updateUserName({ name:currentName }));
            if(!name){
                navigate("/game");
            }
			return handleIsOpen(false);
		}
	};
	return (
		<div>
			<p>CHOOSE YOUR NAME</p>
			<div>
				<input
					autoFocus
					type="text"
					onChange={(e) => handleChange(e)}
					value={currentName}
				/>
				<p
					onClick={handleName}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleName();
						}
					}}
				>
					OK
				</p>
			</div>
		</div>
	);
};

export default Modal;

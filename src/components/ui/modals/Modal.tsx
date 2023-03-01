import React, { useEffect, useLayoutEffect, useState } from "react";
import { Border, Wrapper, Content } from "./Modal.style";
import { IModalProps } from "./type";
import { useDispatch } from "react-redux";
import { updateUserName } from "../../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

const Modal: React.FC<IModalProps> = (props) => {
	const [render, setRender] = useState(<></>);
	useLayoutEffect(() => {
		if (props.action === "success") {
			setRender(<ContentSuccessLvl />);
		}
        if (props.action === "win") {
			setRender(<ContentNewBest />);
		}
		if (props.action === "exit") {
			setRender(<ContentExit />);
		}
		if (props.action === "userName") {
			setRender(<ContentName handleClose={handleClose} />);
		}
        if(props.action === "countDown"){
            setRender(<ContentCountDown handleClose={handleClose}/> )
        }
	}, [props]);

	const handleClose = (bool: boolean) => {
		return props.handleIsOpen(bool, props.action);
	};

	return (
		<Wrapper onClick={() => handleClose(false)}>
			<Border onClick={(e) => e.stopPropagation()}>
				<Content {...props}>{render}</Content>
			</Border>
		</Wrapper>
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
const ContentSuccessLvl = () => {
	return (
		<div>
			<p>NEW BEST SCORE !</p>
			<p>LVL 3 TIME 3:24</p>
		</div>
	);
};
const ContentCountDown = ({ handleClose }: IContent ) => {
    const [count,setCount] = useState(3);
    useEffect(() => {
     
      const timer = setInterval(()=>{
        setCount((prev)=> prev -1)
      },1000)
      if(count<1) {
        clearInterval(timer)
        handleClose(false)
    }
      return () => {
        clearInterval(timer)
      }
    }, [count])
    
	return (
		<div>
			
		</div>
	);
};
const ContentExit = () => {
	const [stay, setStay] = useState(true);
	const handleClick = (bool: boolean) => {
		setStay(bool);
	};
	return (
		<div>
			<p>CONTINUE GAME ?</p>
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
	handleClose: (bool: boolean) => void;
}
const ContentName = ({ handleClose }: IContent) => {
	const [name, setName] = useState("");
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value.toUpperCase());
	};
	const handleName = () => {
		if (name) {
			dispatch(updateUserName({ name }));
			navigate("/game");
			return handleClose(false);
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
					value={name}
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

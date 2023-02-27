import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Border, Wrapper, Content } from "./Modal.style";
import { IModalProps } from "./type";

const Modal: React.FC<IModalProps> = (props) => {
	const [render, setRender] = useState(<></>);
	useLayoutEffect(() => {
		if (props.action === "success") {
			setRender(<ContentSuccess />);
		}
		if (props.action === "exit") {
			setRender(<ContentExit />);
		}
		if (props.action === "userName") {
			setRender(<ContentName />);
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

const ContentSuccess = () => {
	return (
		<div>
			<p>NEW BEST SCORE !</p>
			<p>LVL 3 TIME 3:24</p>
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

const ContentName = () => {
	const [name, setName] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value.toUpperCase());
	};
	return (
		<div>
			<p>CHOOSE YOUR NAME</p>
			<input
				autoFocus
				type="text"
				onChange={(e) => handleChange(e)}
				value={name}
			/>
		</div>
	);
};

export default Modal;

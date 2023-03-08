import  React, { useEffect, useLayoutEffect, useRef } from "react";
import itemListLogo from "../../../assets/img/marioSprite_526x466.png";
import { IItem } from "./type";

const GridItem = (props: { data: IItem;  handleClick: (elem: IItem, ref: React.RefObject<HTMLDivElement>) =>void }) => {

	const configStyle = {
		backgroundImage: `url(${itemListLogo})`,
		width: `${526 / 10}px`,
		height: `${466 / 4}px`,
	};

	const itemRef : React.Ref<HTMLDivElement> = useRef(null);

	const style = {
		...configStyle,
		backgroundPositionX: props.data.positionX,
		backgroundPositionY: props.data.positionY,
	};

	useLayoutEffect(() => {
		if(props.data.isActive)
		itemRef.current?.classList.add("active_item");
	    else if (
			itemRef.current?.classList.contains("active_item") && !props.data.isActive
		){
			itemRef.current?.classList.remove("active_item")
		}
	}, [props.data.isActive])
	
	return (
		<div
			onClick={() => props.handleClick(props.data, itemRef)}
			ref={itemRef}
            className="flip-item-container"
		>
			<div className="flip-item-front"></div>
			<div style={style} className="flip-item-back"></div>
		</div>
	);
};

export default React.memo(GridItem);


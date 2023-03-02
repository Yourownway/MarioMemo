import  React, { useEffect, useRef } from "react";

const GridItem = (props: { data: any; configStyle: any; handleClick: any }) => {
	const itemRef : React.Ref<HTMLDivElement> = useRef(null);

	const style = {
		...props.configStyle,
		backgroundPositionX: props.data.positionX,
		backgroundPositionY: props.data.positionY,
	};

	useEffect(() => {
	 console.log(props.data.isActive,"aaaa");
	 
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


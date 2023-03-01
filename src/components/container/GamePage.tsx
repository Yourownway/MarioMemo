import React, { useEffect, useRef, useState } from "react";
import Grid from "../ui/grid/Grid";
import Timebar from "../ui/timebar/Timebar";
import "animate.css";
import { EAction } from "../ui/modals/type";
interface IStartPageProps {
	handleOpenModal: (bool: boolean, action: EAction) => void;
}
export default function GamePage({ handleOpenModal }: IStartPageProps) {
	const [countDown, setCountDown] = useState(3);
    const countRef = useRef(null)
 //@ts-ignore
    const displayColorCountDown = (count, ref) => {
		if (!ref || !count) return;
		let { color } = ref.current.style;
		switch (count) {
			case 3:
                ref.current.style.color = "rgb(10, 186, 250)";
				break;
			case 2:
				ref.current.style.color = "rgb(240, 196, 54)";
				break;
                case 1:
				ref.current.style.color = "rgb(249, 63, 55)";
                
				break;

			default:
				break;
		}
	};
	useEffect(() => {
		if (countDown < 1) return;
        displayColorCountDown(countDown, countRef)
		const timer = setInterval(() => {
			setCountDown((prev) => prev - 1);
            
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, [countDown]);

	return (
		<div className="gamePage_container">
			{countDown > 0 ? (
                <div className="countDown_container">
                    <h1 ref={countRef}>{countDown}</h1>
                </div>
			) : (
				<>
					<Grid />

					<Timebar />
				</>
			)}
		</div>
	);
}

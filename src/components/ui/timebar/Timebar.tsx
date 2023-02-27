import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IProgress {
	readonly time: number;
}

const Container = styled.div`
	height: 30px;
	width: 60%;
	min-width: 600px;
	position: absolute;
	bottom: 25px;
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
`;
const BaseBox = styled.div`
	border-radius: 12px;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	/* transition: width 10s ease-in-out; */
`;

const Background = styled(BaseBox)`
	background: #f8efef;
	width: 100%;
`;
/* border-radius: ${(p) =>
		p.percent > 95 ? `12px` : "  12px 0px 0px 12px "}; */
const Progress = styled(BaseBox)<IProgress>`
	/* background: repeating-linear-gradient(45deg,blue,white 12px); */
	background-color: rgb(10, 186, 250);
    width: ${({ time }) => `${time}%`};
    border-radius:  ${({ time }) => time > 98 ?'12px' : "12px 0px 0px 12px " };
    `;	


// const [running, setRunning] = useState(false);
// const [progress, setProgress] = useState(0);

// useEffect(() => {
//   if (running) {
//     interval = setInterval(() => {
//       setProgress((prev) => prev + 1);
//     }, 10);
//   } else {
//     clearInterval(interval);
//   }
// }, [running]);

// useEffect(() => {
//   if (progress === 100) {
//     setRunning(false);
//     clearInterval(interval);
//   }
// }, [progress]);
            // @ts-ignore
let timer = undefined;
function Timebar() {
	const [percent, setPercent] = useState(100);
    const [start,setStart] = useState(true)
	console.log("🚀 ~ file: Timebar.tsx:41 ~ Timebar ~ percent:", percent)
    const initTime = 600
	const [time, setTime] = useState(initTime);
 
    
	useEffect(() => {
        if(!start) return
        if(time <= 0) return
         timer = setInterval(() => setTime((prev)=>prev-1), 1000);
        return () => {
            // @ts-ignore
            clearInterval(timer);
		};
	}, [time,start]);

    useEffect(() => {
        if (time <= 0) {
            // @ts-ignore
            clearInterval(timer);
        }
      }, [time]);
    console.log(time/600*100)
	return (
		<Container>
			<Background />
			{/* @ts- ignore */}
			<Progress {...{ time: time/600*100 }} />
		</Container>
	);
}

export default Timebar;

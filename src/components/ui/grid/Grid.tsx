import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import boxeLogo from "../../../assets/img/grid-box.png";
import itemListLogo from "../../../assets/img/marioSprite_526x466.png";
import { initItemsSpriteArray } from "../../../utils/game/sprite";
import GridItem from "./GridItem";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { uiState as uiSlice , handleOpenModal} from "../../../store/slice/uiSlice";
import { gameState as gameSlice, handleLevelUp } from "../../../store/slice/gameSlice";
import { EAction } from "../modals/type";

const DynamicGrid = styled.div`
	margin: 0 auto;
	width: auto;
	
	height: 80vh;
	display: grid;
	/* grid-template-columns: repeat( 4, 1fr); */
	grid-template-columns: ${(p: any) =>
		p.level ? `repeat(${p.level * 4}, 1fr)` : ""};

	grid-gap: 1px;
	grid-auto-rows: minmax(10px, auto);
`;

export interface IItem  {
	positionX: number,
	positionY:number,
	id:string,
	isActive:boolean,
	ref?: React.MutableRefObject<HTMLDivElement>
}
interface IGrid {
	isResumeMenu:boolean;
}
const Grid: React.FC<IGrid> =({isResumeMenu}) => {
	const [itemByPair, setItemByPair] = useState<IItem[]|null>(null);
	const [itemLeftByLevel, setItemLeftByLevel] = useState< IItem[]>([]);
	const [itemToCompare, setItemToCompare] = useState<IItem|null>(null);
	const dispatch = useDispatch();
	const uiState = useSelector(uiSlice);
	const gameState = useSelector(gameSlice);

	const [currentLevel, setCurrentLevel] = useState(1);
	const handleClick = useCallback(
		(elem: IItem, ref: React.MutableRefObject<HTMLDivElement>) => {

			if (!itemByPair) return;
			if (!ref?.current.classList.contains("active_item")) {
				ref.current.classList.add("active_item");
			} else return;
			if (!itemToCompare) {

				ref.current.id = elem.id;
				return setItemToCompare({ ...elem, ref });
			} else if (itemToCompare.id && itemToCompare.id == elem.id) {


				const updateGridStatus = itemByPair.map((item) => {
					if (item.id === elem.id) item.isActive = true
					return item
				})
				const checkIfLvlIsDown = updateGridStatus.filter(item => !item.isActive).length
				setItemByPair(updateGridStatus)
				if (checkIfLvlIsDown === 0) return levelUp()


			} else if (itemToCompare.id != elem.id) {
				// to do displayErrorMessage()

				setTimeout(() => {
					itemToCompare.ref?.current.classList.remove("active_item");
					ref.current.classList.remove("active_item");
				}, 1500);
			}
			return setItemToCompare(null);
		},
		[itemByPair,itemToCompare],
)

const levelUp = () => {
    dispatch(handleLevelUp())
	dispatch(handleOpenModal({isActive:true, modalAction:EAction.LVLUP}))
}

	const generateGrid = (level: number) => {
		let ratio = (247 / 378) * level * 1.2;
		const arrayOfItem: any[] = initItemsSpriteArray(level);

		const arrayOfItemByPair = [...arrayOfItem, ...arrayOfItem];
		setItemByPair(arrayOfItemByPair);
	};
	useEffect(() => {
		if(isResumeMenu && gameState.itemByPair){
		
			return 	setItemByPair(gameState.itemByPair);
		}
		if(gameState.level<= 4){
			generateGrid(gameState.level);
		}
		
	}, [gameState.level]);

	const itemConfigStyle = {
		backgroundImage: `url(${itemListLogo})`,
		width: `${526 / 10}px`,
		height: `${466 / 4}px`,
	};

	return (
		<>
			{gameState.level &&
			<DynamicGrid
				className="animate__backInDown animate__animated"
				{...{ level: gameState.level }}
			>
				{/* @ts-ignore */}
				{itemByPair && itemByPair.map((elem, i) => (
						<GridItem 
							handleClick={handleClick}
							data={elem}
							key={i}
							configStyle={itemConfigStyle}
						/>
					))}
			</DynamicGrid>}
		</>
	);
}


export default Grid;

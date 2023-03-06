import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import itemListLogo from "../../../assets/img/marioSprite_526x466.png";
import { initItemsSpriteArray } from "../../../utils/game/sprite";
import GridItem from "./GridItem";
import { useDispatch, useSelector } from "react-redux";
import { uiState as uiSlice , handleOpenModal} from "../../../store/slice/uiSlice";
import { gameState as gameSlice, handleIsResumeActive, handleItemByPair, handleLevelUp, handleResetGame } from "../../../store/slice/gameSlice";
import { EAction } from "../modals/type";
import { useNavigate } from "react-router-dom";
import { randomizeItem } from "../../../store/utils/grid";

const DynamicGrid = styled.div`
	margin: 0 auto;
	width: auto;
	height: 80vh;
	display: grid;
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
	ref: React.MutableRefObject<HTMLDivElement> | null 
}
interface IGrid {
	isResumeMenu:boolean;
}
const Grid: React.FC<IGrid> =({isResumeMenu}) => {
	const [itemByPair, setItemByPair] = useState<IItem[]>([]);
	const [itemToCompare, setItemToCompare] = useState<IItem|null>(null);
	const dispatch = useDispatch();
	const uiState = useSelector(uiSlice);
	const gameState = useSelector(gameSlice);
	const [levelIsDown, setLevelIsDown] = useState(false)
    let navigate = useNavigate()
	const [currentLevel, setCurrentLevel] = useState(1);
	const handleClick = useCallback(
		(elem: IItem, ref: React.MutableRefObject<HTMLDivElement>) => {
		
            const copyItemByPair = [...itemByPair]
			if (copyItemByPair.length === 0) return;
			if (!ref?.current.classList.contains("active_item")) {
				ref.current.classList.add("active_item");
			} else return;
			if (!itemToCompare) {

				ref.current.id = elem.id;
				return setItemToCompare({ ...elem, ref });
			} else if (itemToCompare.id && itemToCompare.id == elem.id) {


				const updateGridStatus : IItem[] = copyItemByPair.map((item) => {
				
					if (item.id == itemToCompare.id){ 
						const isActive = true;
						return {...item, isActive }
					}
					return item
				})
				const checkIfLvlIsDown = updateGridStatus.filter(item => !item.isActive).length
				setItemByPair(updateGridStatus)
				dispatch(handleItemByPair({itemByPair: updateGridStatus}))
				if (checkIfLvlIsDown === 0) return levelUp(gameState.level)


			} else if (itemToCompare.id != elem.id) {
				// to do displayErrorMessage()
				setTimeout(() => {
					itemToCompare.ref?.current.classList.remove("active_item");
					ref.current.classList.remove("active_item");
				}, 720);
			}
			return setItemToCompare(null);
		},
		[itemByPair,itemToCompare],
)

	const levelUp = (level: number) => {
		if (level >= 4) {
			navigate('/');
			dispatch(handleResetGame())
			return dispatch(handleOpenModal({ isActive: true, modalAction: EAction.GAMEWIN }))
		}
		setLevelIsDown(true)
		dispatch(handleLevelUp())
		dispatch(handleOpenModal({ isActive: true, modalAction: EAction.LVLUP }))

	}

	const generateGrid = (level: number) => {
		let ratio = (247 / 378) * level * 1.2;
		const arrayOfItem: any[] = initItemsSpriteArray(level);
		const arrayOfItemByPair = [...arrayOfItem, ...arrayOfItem];
		const randomArray = randomizeItem(arrayOfItemByPair)
		if (randomArray) {
			setItemByPair(randomArray);
			dispatch(handleItemByPair({ itemByPair: randomArray }))
		}
	};
	useEffect(() => {
		if(isResumeMenu && gameState.itemByPair){
			return 	setItemByPair(gameState.itemByPair);
		}
		if(gameState.level<= 4 && !uiState.modalState.isActive){
			setItemByPair([])
			generateGrid(gameState.level);
			setLevelIsDown(false)
		}
		
	}, [gameState.level,uiState.modalState.isActive]);

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
				{!levelIsDown && itemByPair && itemByPair.map((elem, i) => (
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

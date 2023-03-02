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
	height: calc(100vh - var(--main-brickBottom-size) - 100px);
	display: grid;
	/* grid-template-columns: repeat( 4, 1fr); */
	grid-template-columns: ${(p: any) =>
		p.level ? `repeat(${p.level * 4}, 1fr)` : ""};

	grid-gap: 1px;
	grid-auto-rows: minmax(10px, auto);
`;

interface IItem  {
	positionX: number,
	positionY:number,
	id:string,
	isActive:boolean,
	ref?: React.MutableRefObject<HTMLDivElement>
}

function Grid() {
	const [itemByPair, setItemByPair] = useState<IItem[]|null>(null);
	console.log("🚀 ~ file: Grid.tsx:36 ~ Grid ~ itemByPair:", itemByPair?.length)
	const [itemLeftByLevel, setItemLeftByLevel] = useState< IItem[]>([]);
	const [itemToCompare, setItemToCompare] = useState<IItem|null>(null);
	const dispatch = useDispatch();
	const uiState = useSelector(uiSlice);
	const gameState = useSelector(gameSlice);

	const [currentLevel, setCurrentLevel] = useState(1);
	const handleClick = useCallback(
	(elem: IItem, ref  : React.MutableRefObject<HTMLDivElement>) => {

		if(!itemByPair) return;
		if (!ref?.current.classList.contains("active_item")) {
			ref.current.classList.add("active_item");
		} else return;
		if (!itemToCompare) {
		
			ref.current.id = elem.id;
			return setItemToCompare({ ...elem , ref });
		} else if (itemToCompare.id && itemToCompare.id == elem.id) {
		
			
			const updateGridStatus = itemByPair.map((item)=>{
				if(item.id === elem.id) item.isActive = true
				return item
			})
			const checkIfLvlIsDown = updateGridStatus.filter(item => !item.isActive).length
			setItemByPair(updateGridStatus)
			if(checkIfLvlIsDown === 0) return levelUp()
			// const itemLeft = [...itemLeftByLevel];
			// const indexToRemove = itemLeft.findIndex((e) => e.id === elem.id);
			// delete itemLeft[indexToRemove];
			// setItemLeftByLevel(itemLeft.filter((elem) => !!elem));
		} else if (itemToCompare.id != elem.id) {
			// to do displayErrorMessage()

			setTimeout(() => {
				itemToCompare.ref?.current.classList.remove("active_item");
				ref.current.classList.remove("active_item");
			}, 1500);
		}
		return setItemToCompare(null);

		// on recupere les 2 element dans un tableau
		// on compare les id
		// si les id sont different on remove l'id de de l'array d'item
		// sinon on retourne les cart
		// on remet le tableau 1 à 0
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
		setItemLeftByLevel(arrayOfItem);
		const arrayOfItemByPair = [...arrayOfItem, ...arrayOfItem];
		setItemByPair(arrayOfItemByPair);
	};
	useEffect(() => {
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

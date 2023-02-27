import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import boxeLogo from "../../../assets/img/grid-box.png";
import itemListLogo from "../../../assets/img/marioSprite_526x466.png";
import { getItemsSpriteArray } from "../../../utils/game/sprite";
import GridItem from "./GridItem";
import { v4 as uuid } from "uuid";

const DynamicGrid = styled.div`
margin:  0 auto;
width: auto;
height: calc(100vh - var(--main-brickBottom-size) - 100px);
display: grid;
/* grid-template-columns: repeat( 4, 1fr); */
grid-template-columns: ${(p: any) => p.level ? `repeat(${p.level* 4}, 1fr)` : ""};

grid-gap: 1px;
grid-auto-rows: minmax(10px, auto);
`;

function Grid() {
	const [itemByPair, setItemByPair]: any[] = useState([]);
    const [itemLeftByLevel, setItemLeftByLevel] : any[] = useState([]);
    const [itemToCompare, setItemToCompare] :any = useState(null)

    const [currentLevel, setCurrentLevel] = useState(1)
   
    const handleClick = (elem: any, ref: any) => {
		if (!ref.current.classList.contains("active_item")) {
			ref.current.classList.add("active_item");
		} else return;
		if (!itemToCompare) {
			ref.current.id = elem.id;
			return setItemToCompare({ id: elem.id, ref });
		} else if (itemToCompare.id && itemToCompare.id === elem.id) {
            const itemLeft = [...itemLeftByLevel];
			const indexToRemove = itemLeft.findIndex((e) => e.id === elem.id);
			delete itemLeft[indexToRemove];
			setItemLeftByLevel(itemLeft.filter(elem => !!elem));
		} else if (itemToCompare.id != elem.id) {
            // to do displayErrorMessage()
            setTimeout(() => {
                itemToCompare.ref.current.classList.remove("active_item");
                ref.current.classList.remove("active_item");
            }, 1500);
		}
		return setItemToCompare(null);

		// on recupere les 2 element dans un tableau
		// on compare les id
		// si les id sont different on remove l'id de de l'array d'item
		// sinon on retourne les cart
		// on remet le tableau 1 à 0
	};
     
	const generateGrid = (level: number) => {
        let ratio = (247 / 378) * level  * 1.2
        const arrayOfItem : any[] = getItemsSpriteArray(level);
        setItemLeftByLevel(arrayOfItem)
        const arrayOfItemByPair = [...arrayOfItem, ...arrayOfItem]
        setItemByPair(arrayOfItemByPair);
	};
	useEffect(() => {
		generateGrid(currentLevel);
	}, []);



	const itemConfigStyle = {
		backgroundImage: `url(${itemListLogo})`,
		width: `${526/10}px`,
		height: `${466/4}px`,
	};
    
	return (
		<>
     
			{/* @ts- ignore */}
        { currentLevel && <DynamicGrid {...{level: currentLevel}} >
                {/* @ts-ignore */}
				{itemByPair && itemByPair.map((elem, i) => 
						<GridItem
						    handleClick={handleClick}
							data={elem}
							key={i}
							configStyle={itemConfigStyle}
						/>
				)}
			</DynamicGrid>}
		  {itemToCompare && <div>{itemToCompare.id}</div>}
		</>
	);
}

export default Grid;

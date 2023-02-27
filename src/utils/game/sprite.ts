// build array of item with logo w 526/10 466/4 depend of level
//marioSprite_526x466.png
const getItemsSpriteArray = (level: number) => {
    let array: any[] = [];
    for (let h = 0; h < level; h++) {
        for (let w = 0; w < 10; w++) {
            let positionX = (-w * 526) / 10;
            let positionY = (-h * 466) / 4;
            array.push({ positionX, positionY, id: w, coor: { col: w + 1, raw: h + 1 } });
        }
    }
    return array

}

export { getItemsSpriteArray }
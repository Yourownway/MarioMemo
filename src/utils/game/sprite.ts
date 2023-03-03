// build array of item with logo w 526/10 466/4 depend of level
//marioSprite_526x466.png
const initItemsSpriteArray = (level: number) => {
    let array: any[] = [];
    for (let h = 0; h < level; h++) {
        for (let w = 0; w < 10; w++) {
            let positionX = (-w * 526) / 10;
            let positionY = (-h * 466) / 4;
            let id =array.length + 1 
            array.push({ positionX, positionY, id: id.toString(), isActive:false });
        }
    }
    return array

}

export { initItemsSpriteArray }
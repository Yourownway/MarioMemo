import { IItem } from "../../components/ui/grid/Grid";

const randomizeItem = (array:IItem[]) => {  
    return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}


export {randomizeItem}
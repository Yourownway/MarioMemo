import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../components/ui/grid/type";
const initialState: IGameStateSlice = {
    isSaved: false,
    level: 1,
    timeSpend: 0,
    initTime: 600,
    timeLeft: 600,
    itemByPair: [],
    isPlaying: false,
    isResumeActive: false,

}
interface IGameStateSlice {
    isSaved: boolean,
    level: number,
    timeSpend: number,
    initTime: number,
    timeLeft: number,
    itemByPair: IItem[],
    isPlaying: boolean
    isResumeActive: boolean,

}
interface TSetIsActive {
    payload: { bool: boolean }
    type: string
}
const setTimeLeft: CaseReducer<IGameStateSlice, PayloadAction<{time:number}>> = (state,action) => {
    state.timeLeft = action.payload.time
}
const setIsPlaying: CaseReducer<IGameStateSlice, TSetIsActive> = (state, action: TSetIsActive) => {
    const { bool } = action.payload
    state.isPlaying = bool
}
const setIsResumeActive: CaseReducer<IGameStateSlice, TSetIsActive> = (state, action: TSetIsActive) => {
    const { bool } = action.payload
    state.isResumeActive = bool
}
const setItemByPair: CaseReducer<IGameStateSlice, PayloadAction<{itemByPair: IGameStateSlice["itemByPair"]}>> = (state, action ) => {
    const  {itemByPair}  = action.payload
    //@ts-ignore
    state.itemByPair = itemByPair
} 
const setLevelUp :  CaseReducer<IGameStateSlice> = (state) => {
    state.level += 1
}
const gameSlice = createSlice({
    name: 'saveGame',
    initialState,
    reducers: {
        handleIsPlaying: setIsPlaying,
        handleIsResumeActive: setIsResumeActive,
        handleResetGame: () => initialState,
        updateTimeLeft: setTimeLeft,
        handleLevelUp: setLevelUp,
        handleItemByPair: setItemByPair,
    },
})


export const { handleIsPlaying,handleIsResumeActive, updateTimeLeft,handleResetGame,handleLevelUp,handleItemByPair } = gameSlice.actions;

export const gameState = (state: { game: IGameStateSlice }) => state.game;

export default gameSlice.reducer;


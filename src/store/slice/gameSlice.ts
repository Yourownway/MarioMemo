import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: IGameStateSlice = {
    isSaved: false,
    level: 1,
    timeSpend: 0,
    initTime: 600,
    timeLeft: 600,
    itemArray: [],
    itemLeft: [],
    isPlaying: false,
    isResumeActive: false,
}
interface IGameStateSlice {
    isSaved: boolean,
    level: number,
    timeSpend: number,
    initTime: number,
    timeLeft: number,
    itemArray: any[],
    itemLeft: any[],
    isPlaying: boolean
    isResumeActive: boolean,
}
interface TSetIsActive {
    payload: { bool: boolean }
    type: string
}
const setTimeLeft: CaseReducer<IGameStateSlice> = (state) => {
    state.timeLeft -= 1
}
const setIsPlaying: CaseReducer<IGameStateSlice, TSetIsActive> = (state, action: TSetIsActive) => {
    const { bool } = action.payload
    state.isPlaying = bool
}
const setIsResumeActive: CaseReducer<IGameStateSlice, TSetIsActive> = (state, action: TSetIsActive) => {
    const { bool } = action.payload
    state.isResumeActive = bool
}

const gameSlice = createSlice({
    name: 'saveGame',
    initialState,
    reducers: {
        handleIsPlaying: setIsPlaying,
        handleIsResumeActive: setIsResumeActive,
        handleResetGame: () => initialState,
        decrementTimeLeft: setTimeLeft

    },
})


export const { handleIsPlaying,handleIsResumeActive, decrementTimeLeft,handleResetGame } = gameSlice.actions;

export const gameState = (state: { game: IGameStateSlice }) => state.game;

export default gameSlice.reducer;


import { CaseReducer, createSlice } from "@reduxjs/toolkit";
const initialState : IGameStateSlice = {
    isSaved: false,
    level:0,
    time:0,
    itemArray:[],
    itemLeft: [],
    isPlaying: false,
}
interface IGameStateSlice  {
    isSaved: boolean,
    level: number,
    time:number,
    itemArray:any[],
    itemLeft:any[],
    isPlaying:boolean
}
interface TSetIsPlaying {
    payload: { bool: boolean }
    type: string
}

const setIsPlaying: CaseReducer<IGameStateSlice, TSetIsPlaying> = (state, action: TSetIsPlaying) => {
    const {bool} = action.payload
    state.isPlaying = bool
}
const gameSlice = createSlice({
    name: 'saveGame',
    initialState,
    reducers: {
      handleIsPlaying: setIsPlaying,
  
    },
  })


  export const { handleIsPlaying } = gameSlice.actions;

  export const uiState = (state: { game: IGameStateSlice }) => state.game;
  
  export default gameSlice.reducer;


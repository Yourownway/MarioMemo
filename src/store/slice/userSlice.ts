import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: TSliceState = {
    name: "",
    best: { isExists: false, time: 0, level: 0 }
}
type TSliceState = {
    name: string,
    best: Best
}

interface TUpdateNameAction {
    payload: { name: string }
    type: string
}

interface TUpdateScoreAction {
    payload: { best: Best }
    type: string
}


type Best = {
    isExists: boolean, time: number, level: number
}
const setName: CaseReducer<TSliceState, TUpdateNameAction> = (state, action: TUpdateNameAction) => {
    const { name } = action.payload
    state.name = name

}

const setScore: CaseReducer<TSliceState, TUpdateScoreAction> = (state, action: TUpdateScoreAction) => {
    const { best } = action.payload
    state.best = { isExists: true, time: best.time || 0, level: best.level || 0 }

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserName: setName,
        updateUserScore: setScore
    },
})


export const { updateUserName,
    updateUserScore } = userSlice.actions;

export const userState = (state: { user: TSliceState }) => state.user;

export default userSlice.reducer;
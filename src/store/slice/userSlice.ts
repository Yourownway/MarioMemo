import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: TSliceState = {
    name: "",
    best: { isExists: true, time: 0, level: 0 },
    step:"start"
}
type TSliceState = {
    name: string,
    best: Best,
    step:string,
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
const setStep: CaseReducer<TSliceState, PayloadAction<{step:string}>> = (state, action) => {
    const { step } = action.payload
    state.step = step

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
        updateUserScore: setScore,
        handleStep: setStep
    },
})


export const { updateUserName,
    updateUserScore,handleStep } = userSlice.actions;

export const userState = (state: { user: TSliceState }) => state.user;

export default userSlice.reducer;
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: TSliceState = {
    name: "test",
    best: { isExsiste: false, time: 0, level: 0 }
}
type TSliceState = {
    name : string,
    best: Best
  }
type Best = {
    isExsiste: boolean, time: number, level :number
}  
const update: CaseReducer<TSliceState, PayloadAction<TSliceState>> = (state, action) => {
    const { best, name } = action.payload
    switch (action.type) {
        case "name":
            state.name = name
            break;
        case "bestScore":
            state.best = { isExsiste: true, time: best.time, level: best.level }
            break
        default:
            break;
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState ,
    reducers: {
        updateUser : update,
    },
})




export const { updateUser } = userSlice.actions;

export const userState = (state:{user: TSliceState}) => state.user;

export default userSlice.reducer;
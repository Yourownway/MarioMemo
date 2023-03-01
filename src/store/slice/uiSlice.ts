import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: TUiSlice = {
    modalIsOpen : false
}
type TUiSlice = {
    modalIsOpen : any
}


interface THandleModal {
    payload: { bool: boolean }
    type: string
}

const setModal: CaseReducer<TUiSlice, THandleModal> = (state, action: THandleModal) => {
    const {bool} = action.payload
    state.modalIsOpen = bool

}
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        handleOpenModal: setModal,
    },
})


export const { handleOpenModal } = uiSlice.actions;

export const uiState = (state: { ui: TUiSlice }) => state.ui;

export default uiSlice.reducer;
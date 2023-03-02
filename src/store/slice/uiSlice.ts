import { EAction } from './../../components/ui/modals/type';
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: IUiStateSlice = {
    modalState :{ isActive: false, modalAction:EAction.INIT},
    countDownState: { isActive:true}
}
interface IUiStateSlice {
    modalState : TModal
    countDownState: TActive
}

type TModal = {
    isActive: boolean,
    modalAction: EAction
}
type TActive = {
    isActive:boolean
}

interface TSetModalIsOpen {
    payload: TModal
    type: string
}

const setModalIsOpen: CaseReducer<IUiStateSlice, TSetModalIsOpen> = (state, action: TSetModalIsOpen) => {
    const {isActive, modalAction} = action.payload
    state.modalState = { isActive,modalAction }

}
const setCountDownIsActive: CaseReducer<IUiStateSlice,PayloadAction<TActive>> = (state, action) => {
    state.countDownState.isActive =  action.payload.isActive

}
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        handleOpenModal: setModalIsOpen,
        handleCountDownIsActive: setCountDownIsActive
    },
})


export const { handleOpenModal,handleCountDownIsActive } = uiSlice.actions;

export const uiState = (state: { ui: IUiStateSlice }) => state.ui;

export default uiSlice.reducer;
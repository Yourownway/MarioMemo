import { EAction } from './../../components/ui/modals/type';
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: IUiStateSlice = {
    modalState :{ isActive: false, modalAction:EAction.INIT}
}
interface IUiStateSlice {
    modalState : TModal
}

type TModal = {
    isActive: boolean,
    modalAction: EAction
}

interface TSetModalIsOpen {
    payload: TModal
    type: string
}

const setModalIsOpen: CaseReducer<IUiStateSlice, TSetModalIsOpen> = (state, action: TSetModalIsOpen) => {
    const {isActive, modalAction} = action.payload
    state.modalState = { isActive,modalAction }

}
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        handleOpenModal: setModalIsOpen,
    },
})


export const { handleOpenModal } = uiSlice.actions;

export const uiState = (state: { ui: IUiStateSlice }) => state.ui;

export default uiSlice.reducer;
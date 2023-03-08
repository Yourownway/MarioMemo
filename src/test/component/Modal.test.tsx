import { screen } from "@testing-library/react"
import Modal from "../../components/ui/modals/Modal"
import { EAction } from "../../components/ui/modals/type"
import { handleOpenModal } from "../../store/slice/uiSlice"
import { setupStore } from "../../store/store"
import storeMock from "../mock/store-mock"
import { renderWithProviders } from "../utils/wrapper-test"

test('should display Modal with exit content', () => {
    const store = setupStore()
    store.dispatch(handleOpenModal({ isActive: true, modalAction: EAction.EXIT }))
    renderWithProviders(<Modal />, { store })
    const element = screen.getByTestId('modal_exit')
    expect(element).not.toBe(null)
    expect(store.getState().ui.modalState.isActive).toBe(true)
    expect(store.getState().ui.modalState.modalAction).toBe("exit")
})

test('should display Modal with best score content', () => {
    const store = setupStore()
    store.dispatch(handleOpenModal({ isActive: true, modalAction: EAction.BEST }))
    renderWithProviders(<Modal />, { store })
    const element = screen.getByTestId('modal_best')
    expect(element).not.toBe(null)
    expect(store.getState().ui.modalState.isActive).toBe(true)
    expect(store.getState().ui.modalState.modalAction).toBe("best")
})
test('should display Modal with lvlUp content', () => {
    const store = setupStore()
    store.dispatch(handleOpenModal({ isActive: true, modalAction: EAction.LVLUP }))
    renderWithProviders(<Modal />, { store })
    const element = screen.getByTestId('modal_lvlUp')
    expect(element).not.toBe(null)
    expect(store.getState().ui.modalState.isActive).toBe(true)
    expect(store.getState().ui.modalState.modalAction).toBe("lvlUp")
})
test('should display Modal with win game content', () => {
    const store = setupStore()
    store.dispatch(handleOpenModal({ isActive: true, modalAction: EAction.GAMEWIN }))
    renderWithProviders(<Modal />, { store })
    const element = screen.getByTestId('modal_win')
    expect(element).not.toBe(null)
    expect(store.getState().ui.modalState.isActive).toBe(true)
    expect(store.getState().ui.modalState.modalAction).toBe("gameWin")

})
test('should display Modal with gameover content', () => {
    const store = setupStore()
    store.dispatch(handleOpenModal({ isActive: true, modalAction: EAction.GAMEOVER }))
    renderWithProviders(<Modal />, { store })
    const element = screen.getByTestId('modal_over')
    expect(element).not.toBe(null)
    expect(store.getState().ui.modalState.isActive).toBe(true)
    expect(store.getState().ui.modalState.modalAction).toBe("gameOver")

})

test('should display Modal with name content', () => {
    const store = setupStore()
    store.dispatch(handleOpenModal({ isActive: true, modalAction: EAction.USERNAME }))
    renderWithProviders(<Modal />, { store })
    const element = screen.getByTestId('modal_name')
    expect(element).not.toBe(null)
    expect(store.getState().ui.modalState.isActive).toBe(true)
    expect(store.getState().ui.modalState.modalAction).toBe("userName")

})
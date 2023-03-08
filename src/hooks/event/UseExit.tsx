import { useCallback, useEffect, useState } from 'react'
import { handleIsPlaying } from "../../store/slice/gameSlice";
import { EAction } from "../../components/ui/modals/type";
import { uiState as uiSlice, handleOpenModal } from "../../store/slice/uiSlice";
import { userState as userSlice } from '../../store/slice/userSlice';
import { useAppDispatch, useAppSelector } from '../store/UseStore';


export default function UseExit() {
    const dispatch = useAppDispatch();
    const uiState = useAppSelector(uiSlice);
    const userState = useAppSelector(userSlice);

    const [keyIsDown, setKeyIsDown] = useState(false);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent, action: EAction) => {
            if (keyIsDown) return
            setKeyIsDown(true)
            e.preventDefault()
            if (userState.step !== "game" || uiState.countDownState.isActive) return
            if (e.key === "Escape") {
                const { isActive } = uiState.modalState
                dispatch(handleIsPlaying({ bool: isActive }));
                dispatch(
                    handleOpenModal({ isActive: !isActive, modalAction: action })
                );
            }
        },
        [userState.step, uiState.countDownState.isActive, uiState.modalState, dispatch,keyIsDown],
    )
    const handleKeyUp = useCallback(
        (e: KeyboardEvent) => {
            if (e) setKeyIsDown(false)
        },
        [],
    )




    useEffect(() => {
        window.addEventListener("keydown", (e) => handleKeyDown(e, EAction.EXIT));
        return () => {
            window.removeEventListener("keydown", (e) => handleKeyDown(e, EAction.EXIT));
        };
    }, [handleKeyDown]);

    useEffect(() => {
        window.addEventListener("keyup", (e) => handleKeyUp(e));
        return () => {
            window.removeEventListener("keyup", (e) => handleKeyUp(e));
        };
    }, [handleKeyUp]);
}

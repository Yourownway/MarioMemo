import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { gameState as gameSlice, handleIsPlaying } from "../../store/slice/gameSlice";
import { EAction } from "../../components/ui/modals/type";
import { uiState as uiSlice, handleOpenModal } from "../../store/slice/uiSlice";
import { userState as userSlice } from '../../store/slice/userSlice';


export default function UseExit() {
    const dispatch = useDispatch();
    const gameState = useSelector(gameSlice);
    const uiState = useSelector(uiSlice);
    const userState = useSelector(userSlice);

    const [keyIsDown, setKeyIsDown] = useState(false)
    const handleKeyDown =
        (e: KeyboardEvent, action: EAction) => {
            if (keyIsDown) return
            setKeyIsDown(true)
            e.preventDefault()
            if (userState.step !== "game" || uiState.countDownState.isActive) return
            if (e.key === "Escape") {
                const isActive = uiState.modalState.isActive
                dispatch(handleIsPlaying({ bool: isActive }));
                dispatch(
                    handleOpenModal({ isActive: !isActive, modalAction: action })
                );
            }
        }
    const handleKeyUp = (e: KeyboardEvent) => {
        if (e) setKeyIsDown(false)
    }

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

import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { gameState as gameSlice, handleIsPlaying } from "../../store/slice/gameSlice";
import { EAction } from "../../components/ui/modals/type";
import { uiState as uiSlice, handleOpenModal } from "../../store/slice/uiSlice";


export default function UseExit() {
    const dispatch = useDispatch();
    const gameState = useSelector(gameSlice);
    const uiState = useSelector(uiSlice);

    const onExit = useCallback(
        (e: KeyboardEvent, action: EAction) => {
            if (e.key === "Escape") {
               const isActive = uiState.modalState.isActive
                dispatch(handleIsPlaying({ bool: isActive }));    
                dispatch(
                    handleOpenModal({ isActive: !isActive, modalAction: action })
                );
           }
        },
      [],
    )
    


    useEffect(() => {
        
        window.addEventListener("keydown", (e) => onExit(e, EAction.EXIT));
        return () => {
            window.removeEventListener("keydown", (e) => onExit(e, EAction.EXIT));
        };
    }, [onExit]);
}

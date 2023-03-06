import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { gameState as gameSlice, handleIsPlaying } from "../../store/slice/gameSlice";
import { EAction } from "../../components/ui/modals/type";
import { uiState as uiSlice, handleOpenModal } from "../../store/slice/uiSlice";
import {userState as userSlice} from '../../store/slice/userSlice';


export default function UseExit() {
    const dispatch = useDispatch();
    const gameState = useSelector(gameSlice);
    const uiState = useSelector(uiSlice);
    const userState = useSelector(userSlice);
    const onExit = 
        (e: KeyboardEvent, action: EAction) => {
            if(userState.step !== "game") return
            if (e.key === "Escape") {
               const isActive = uiState.modalState.isActive
                dispatch(handleIsPlaying({ bool: isActive }));    
                dispatch(
                    handleOpenModal({ isActive: !isActive, modalAction: action })
                );
           }
        }
    
    
    


    useEffect(() => {
        window.addEventListener("keydown", (e) => onExit(e, EAction.EXIT));
        return () => {
            window.removeEventListener("keydown", (e) => onExit(e, EAction.EXIT));
        };
    }, [onExit]);
}

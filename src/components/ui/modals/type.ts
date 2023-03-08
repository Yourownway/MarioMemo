export interface IModalProps { 
    id? : string
}
export interface IModalContentProps {
    readonly modalAction: EAction
}

export enum EAction {
INIT = "",
GAMEWIN = "gameWin",
GAMEOVER = "gameOver",
LVLUP = "lvlUp",
EXIT = "exit",
USERNAME = "userName",
BEST = "best"

}
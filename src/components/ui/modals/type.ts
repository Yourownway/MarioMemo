export interface IModalProps { 
    
    readonly modalAction: EAction
}

export enum EAction {
INIT = "",
GAMEWIN = "gameWin",
GAMEOVER = "gameOver",
LVLUP = "lvlUp",
EXIT = "exit",
USERNAME = "userName",
COUNTDOWN = "countDown",
BEST = "best"

}
export interface IModalProps { 
    
    readonly modalAction: EAction
}

export enum EAction {
INIT = "",
SUCCESS = "success",
LVLUP = "lvlUp",
EXIT = "exit",
USERNAME = "userName",
COUNTDOWN = "countDown",
BEST = "best"

}
export interface IModalProps { 
    
    readonly modalAction: EAction
}

export enum EAction {
INIT = "",
SUCCESS = "success",
EXIT = "exit",
USERNAME = "userName",
COUNTDOWN = "countDown",
BEST = "best"

}
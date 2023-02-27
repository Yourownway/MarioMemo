export interface IModalProps { 
    isOpen: boolean,
    handleIsOpen: (bool:boolean,action:EAction)=>void,
    readonly action: EAction
}

export enum EAction {
SUCCESS = "success",
EXIT = "exit",
USERNAME = "userName"

}
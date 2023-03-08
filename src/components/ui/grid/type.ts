export interface IItem  {
	positionX: number,
	positionY:number,
	id:string,
	isActive:boolean,
	ref?: React.RefObject<HTMLDivElement> 
}
export interface IGrid {
	isResumeMenu:boolean;
}
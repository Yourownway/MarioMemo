export interface IProgress {
	readonly timeLeft: number;
}



export interface IProgressProps {
	timeLeft: number;
	decrementTimeLeft: () => void;
}
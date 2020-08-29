export interface IState {
	onEnter(): void;
	onLeave(): void;
	updateFrame?(delta?: number): void;
}

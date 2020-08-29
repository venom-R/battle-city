import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class GameState extends AbstractState implements IState {
	public onEnter(): void {
		console.log("GameState onEnter");
	}

	public onLeave(): void {
		console.log("GameState onLeave");
	}

	public updateFrame(delta: number): void {}
}

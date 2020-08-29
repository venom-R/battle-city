import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class MenuState extends AbstractState implements IState {
	public onEnter(): void {
		console.log("MenuState onEnter");
	}

	public onLeave(): void {
		console.log("MenuState onLeave");
	}

	public updateFrame(delta: number): void {}
}

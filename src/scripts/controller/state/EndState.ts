import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class EndState extends AbstractState implements IState {
	public onEnter(): void {
		console.log("EndState onEnter");
	}

	public onLeave(): void {
		console.log("EndState onLeave");
	}

	public updateFrame(delta: number): void {}
}

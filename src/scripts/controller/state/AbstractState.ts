import { Container } from "pixi.js";
import { IState } from "../../interface/IState";
import { IStateContext } from "../../interface/IStateContext";
import { GameModel } from "../../model/GameModel";
import { StateMachine } from "../../util/StateMachine";
import { GameView } from "../../view/GameView";

export abstract class AbstractState implements IState {
	public scene: Container;
	protected model: GameModel;
	protected view: GameView;

	constructor(context: IStateContext) {
		this.model = context.model;
		this.view = context.view;
	}

	public transition(nextStateName: string): void {
		this.model.stateMachine.transition(nextStateName);
	}

	public abstract onEnter(): void;
	public abstract onLeave(): void;
}

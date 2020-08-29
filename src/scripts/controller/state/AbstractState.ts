import { IState } from "../../interface/IState";
import { IStateContext } from "../../interface/IStateContext";
import { GameModel } from "../../model/GameModel";
import { StateMachine } from "../../util/StateMachine";
import { GameView } from "../../view/GameView";

export abstract class AbstractState implements IState {
	protected model: GameModel;
	protected view: GameView;
	protected stateMachine: StateMachine;

	constructor(context: IStateContext) {
		this.model = context.model;
		this.view = context.view;
		this.stateMachine = this.model.stateMachine;
	}

	public abstract onEnter(): void;
	public abstract onLeave(): void;
	public abstract updateFrame(delta: number): void;
}

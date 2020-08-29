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
	protected stateMachine: StateMachine;

	constructor(context: IStateContext) {
		this.model = context.model;
		this.view = context.view;
		this.stateMachine = this.model.stateMachine;
		this.scene = new Container();
	}

	public abstract onEnter(): void;
	public abstract onLeave(): void;
}

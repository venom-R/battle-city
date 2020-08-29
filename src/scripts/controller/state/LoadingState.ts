import { Container } from "pixi.js";
import { EStateName } from "../../enum/EStateName";
import { IState } from "../../interface/IState";
import { IStateContext } from "../../interface/IStateContext";
import { LoadingBar } from "../../components/LoadingBar/LoadingBar";
import { AbstractState } from "./AbstractState";

export class LoadingState extends AbstractState implements IState {
	public scene: Container;
	public readonly loadingBar: LoadingBar;

	constructor(context: IStateContext) {
		super(context);
		this.scene = new Container();
		this.loadingBar = new LoadingBar();
		this.view.alignComponentCenterX(this.loadingBar);
		this.view.alignComponentCenterY(this.loadingBar);
		this.scene.addChild(this.loadingBar);
	}

	public onEnter(): void {
		this.view.addToStage(this.scene);
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	public updateFrame(delta?: number): void {
		this.loadingBar.updateProgress(this.model.loadingProgress);
		if (this.model.isAssetsLoaded) {
			this.stateMachine.transition(EStateName.MENU);
		}
	}
}

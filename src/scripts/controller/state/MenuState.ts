import { Button } from "../../components/Button/Button";
import { Title } from "../../components/Title/Title";
import { EStateName } from "../../enum/EStateName";
import { ETextureName } from "../../enum/ETextureName";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class MenuState extends AbstractState implements IState {
	private _title: Title;
	private _startButton: Button;

	public onEnter(): void {
		this.createTitle();
		this.createStartButton();
		this.scene.addChild(this._title, this._startButton);
		this.view.alignComponentCenterY(this.scene);
		this.view.addToStage(this.scene);
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	private createTitle(): void {
		this._title = new Title("Tank Games");
		this.view.alignComponentCenterX(this._title);
	}

	private createStartButton(): void {
		this._startButton = new Button(this.view.getTexture(ETextureName.START_BUTTON));
		this._startButton.y = 200;
		this.view.alignComponentCenterX(this._startButton);
		this._startButton.once("pointerdown", () => this.onStart());
	}

	private onStart(): void {
		this.stateMachine.transition(EStateName.GAME);
	}
}

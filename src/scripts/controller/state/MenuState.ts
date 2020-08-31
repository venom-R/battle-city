import { Button } from "../../components/Button/Button";
import { Title } from "../../components/Title/Title";
import { EComponentType } from "../../enum/EComponentType";
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
		this.scene.visible = true;
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	private createTitle(): void {
		this._title = this.createComponent(EComponentType.TITLE, "Tank Game");
		this.view.alignComponentCenterX(this._title);
	}

	private createStartButton(): void {
		this._startButton = this.createComponent(EComponentType.START_BUTTON);
		this._startButton.y = 200;
		this.view.alignComponentCenterX(this._startButton);
		this._startButton.once("pointerdown", () => this.onStart());
	}

	private onStart(): void {
		this.transition(EStateName.GAME);
	}
}

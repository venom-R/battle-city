import { AbstractButton } from "../../components/Button/AbstractButton";
import { StartButton } from "../../components/Button/StartButton";
import { Title } from "../../components/Text/Title";
import { EStateName } from "../../enum/EStateName";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class MenuState extends AbstractState implements IState {
	private _title: Title;
	private _startButton: AbstractButton;

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
		this._title = new Title("Tank Game");//add to utils class names
		this.view.alignComponentCenterX(this._title);
	}

	private createStartButton(): void {
		this._startButton = this.view.createComponent(new StartButton());
		this._startButton.y = 200;
		this.view.alignComponentCenterX(this._startButton);
		this._startButton.once("pointerdown", () => this.onStart());
	}

	private onStart(): void {
		this.transition(EStateName.GAME);
	}
}

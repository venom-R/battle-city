import { Title } from "../../components/Title/Title";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class EndState extends AbstractState implements IState {
	private _title: Title;

	public onEnter(): void {
		this.createTitle();
		this.scene.addChild(this._title);
		this.view.alignComponentCenterY(this.scene);
		this.scene.visible = true;
		this.playSound();
		console.log(`You scored ${this.model.totalPoints} points`);
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	private createTitle(): void {
		const content: string = this.model.isWin ? "You win!" : "You lose!";
		this._title = this.view.createComponent(Title, content);
		this.view.alignComponentCenterX(this._title);
	}

	private playSound(): void {
		if (this.model.isWin) {
			this.model.sound.win();
		} else {
			this.model.sound.lose();
		}
	}
}

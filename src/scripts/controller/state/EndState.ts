import { Paragraph } from "../../components/Text/Paragraph";
import { Title } from "../../components/Text/Title";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class EndState extends AbstractState implements IState {
	private _title: Title;
	private _score: Paragraph;

	public onEnter(): void {
		this.createTitle();
		this.createScore();
		this.scene.addChild(this._title, this._score);
		this.view.alignComponentCenterY(this.scene);
		this.scene.visible = true;
		this.playSound();
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	private createTitle(): void {
		const content: string = this.model.isWin ? "You win!" : "You lose!";
		this._title = new Title(content);
		this.view.alignComponentCenterX(this._title);
	}

	private createScore(): void {
		const content: string = `You scored ${this.model.totalPoints} points`;
		this._score = new Paragraph(content);
		this._score.y = 100;
		this.view.alignComponentCenterX(this._score);
	}

	private playSound(): void {
		if (this.model.isWin) {
			this.model.soundManager.win();
		} else {
			this.model.soundManager.lose();
		}
	}
}

import { EComponentName } from "../../enum/EComponentName";
import { IComponent } from "../../interface/IComponent";
import { Rectangle } from "./Rectangle";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";
import { LoadingBarBG } from "./LoadingBarBG";
import { LoadingBarProgress } from "./LoadingBarProgress";

export class LoadingBar extends AbstractComponent implements IComponent {
	public name: string = EComponentName.LOADING_BAR;
	private readonly _bg: Rectangle;
	private readonly _bar: Rectangle;
	private _progress: number = 0;

	constructor() {
		super();
		this._bg = new LoadingBarBG().draw();
		this._bar = new LoadingBarProgress().draw();
		this._bar.position.set(5, 5);
		this.updateProgress(this._progress);
		this.addChild(this._bg, this._bar);
	}

	public updateProgress(progress: number): void {
		this._progress = progress;
		this._bar.width = Math.ceil((this._bar.defaultWidth / 100) * progress);
	}
}

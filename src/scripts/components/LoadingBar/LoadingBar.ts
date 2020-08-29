import { Container } from "pixi.js";
import { Rectangle } from "../../shapes/Rectangle";
import { LoadingBarBG } from "./LoadingBarBG";
import { LoadingBarProgress } from "./LoadingBarProgress";

export class LoadingBar extends Container {
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
		console.log("progress", progress);
		console.log("width", this._bar.width);
	}
}

import { Graphics } from "pixi.js";

export class Rectangle extends Graphics {
	public defaultWidth: number;
	public defaultHeight: number;
	public color: number;

	public draw(): Rectangle {
		this.beginFill(this.color);
		this.drawRect(0, 0, this.defaultWidth, this.defaultHeight);
		this.endFill();
		return this;
	}
}

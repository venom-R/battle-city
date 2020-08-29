import { Sprite, Texture } from "pixi.js";

export class Button extends Sprite {
	constructor(texture: Texture) {
		super(texture);
		this.buttonMode = true;
		this.interactive = true;
	}
}

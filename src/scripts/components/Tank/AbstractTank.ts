import { Sprite, Texture } from "pixi.js";
import { IComponent } from "../../interface/IComponent";

export abstract class AbstractTank extends Sprite implements IComponent {
	abstract type: string;

	constructor(texture: Texture) {
		super(texture);
		this.width = 32;
		this.height = 32;
	}
}

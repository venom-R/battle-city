import { Sprite, Texture } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";

export class Button extends Sprite implements IComponent {
	public type: string = EComponentType.BUTTON;

	constructor(texture: Texture) {
		super(texture);
		this.buttonMode = true;
		this.interactive = true;
	}
}

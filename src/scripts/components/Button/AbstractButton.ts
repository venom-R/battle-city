import { Sprite, Texture } from "pixi.js";
import { IComponent } from "../../interface/IComponent";

export abstract class AbstractButton extends Sprite implements IComponent {
	abstract type: string;

	protected constructor(texture: Texture) {
		super(texture);
		this.buttonMode = true;
		this.interactive = true;
	}
}

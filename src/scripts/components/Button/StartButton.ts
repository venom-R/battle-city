import { Texture } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";
import { AbstractButton } from "./AbstractButton";

export class StartButton extends AbstractButton implements IComponent {
	public type: string = EComponentType.START_BUTTON;
	constructor(texture: Texture) {
		super(texture);
	}
}

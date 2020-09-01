import { Sprite } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";

export class Water extends Sprite implements IComponent {
	public type: string = EComponentType.WATER;
}

import { Sprite } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";

export class Base extends Sprite implements IComponent {
	public type: string = EComponentType.BASE;
	public lifePoints: number = 1;
}

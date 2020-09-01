import { Sprite } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";

export class Leaf extends Sprite implements IComponent {
	public type: string = EComponentType.LEAVES;
}

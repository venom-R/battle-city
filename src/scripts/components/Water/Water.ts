import { Sprite } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";

export class Water extends Sprite implements IComponent {
	public type: string = EComponentType.WATER;
	public static readonly requiredTextures: string | Array<string> = ETextureName.WATER;
}

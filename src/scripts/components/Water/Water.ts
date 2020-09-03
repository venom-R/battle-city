import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export class Water extends AbstractComponent implements IComponent {
	public type: string = EComponentType.WATER;
	public static readonly requiredTextures: string | Array<string> = ETextureName.WATER;
}

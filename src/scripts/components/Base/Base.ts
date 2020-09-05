import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export class Base extends AbstractComponent implements IComponent {
	public name: string = EComponentType.BASE;
	public lifePoints: number = 1;
	public static readonly requiredTextures: string | Array<string> = ETextureName.BASE;
}

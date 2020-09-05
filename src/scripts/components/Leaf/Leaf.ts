import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export class Leaf extends AbstractComponent implements IComponent {
	public name: string = EComponentType.LEAVES;
	public static readonly requiredTextures: string | Array<string> = ETextureName.LEAVES;
}

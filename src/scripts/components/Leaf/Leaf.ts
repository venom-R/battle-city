import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export class Leaf extends AbstractComponent implements IComponent {
	public name: string = EComponentName.LEAVES;
	public readonly requiredTextures: string | Array<string> = ETextureName.LEAVES;
}

import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export class Water extends AbstractComponent implements IComponent {
	public name: string = EComponentName.WATER;
	public readonly requiredTextures: string | Array<string> = ETextureName.WATER;
}

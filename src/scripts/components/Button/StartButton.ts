import {EComponentType} from "../../enum/EComponentType";
import {ETextureName} from "../../enum/ETextureName";
import {IComponent} from "../../interface/IComponent";
import {AbstractButton} from "./AbstractButton";

export class StartButton extends AbstractButton implements IComponent {
	public type: string = EComponentType.START_BUTTON;
	public static readonly requiredTextures: string | Array<string> = ETextureName.START_BUTTON;
}

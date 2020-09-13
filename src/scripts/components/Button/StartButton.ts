import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractButton } from "./AbstractButton";

export class StartButton extends AbstractButton implements IComponent {
	public name: string = EComponentName.START_BUTTON;
	public static readonly requiredTextures: string | Array<string> = ETextureName.START_BUTTON;
}

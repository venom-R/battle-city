import {EComponentType} from "../../enum/EComponentType";
import {ETextureName} from "../../enum/ETextureName";
import {IComponent} from "../../interface/IComponent";
import {AbstractTank} from "./AbstractTank";

export class PlayerTank extends AbstractTank implements IComponent {
	public type: string = EComponentType.PLAYER_TANK;
	public static readonly requiredTextures: string | Array<string> = ETextureName.PLAYER_TANK;
}

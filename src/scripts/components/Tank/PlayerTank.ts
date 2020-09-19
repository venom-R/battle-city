import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IMovingComponent } from "../../interface/IComponent";
import { AbstractTank } from "./AbstractTank";

export class PlayerTank extends AbstractTank implements IMovingComponent {
	public name: string = EComponentName.PLAYER_TANK;
	public readonly requiredTextures: string | Array<string> = ETextureName.PLAYER_TANK;
}

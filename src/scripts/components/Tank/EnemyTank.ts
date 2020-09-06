import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IMovingComponent } from "../../interface/IComponent";
import { AbstractTank } from "./AbstractTank";

const tankTextureNames: Array<string> = [ETextureName.ENEMY_BLUE, ETextureName.ENEMY_RED, ETextureName.ENEMY_WHITE];

export class EnemyTank extends AbstractTank implements IMovingComponent {
	public name: string = EComponentType.ENEMY_TANK;
	public static readonly requiredTextures: string | Array<string> = tankTextureNames;
	protected stopMoveAfterHit: boolean = true;
}

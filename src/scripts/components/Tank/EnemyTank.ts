import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractTank } from "./AbstractTank";

export class EnemyTank extends AbstractTank implements IComponent {
	public name: string = EComponentType.ENEMY_TANK;
	public static readonly requiredTextures: string | Array<string> = [
		ETextureName.ENEMY_BLUE,
		ETextureName.ENEMY_RED,
		ETextureName.ENEMY_WHITE,
	];
}

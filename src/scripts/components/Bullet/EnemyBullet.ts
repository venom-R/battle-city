import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IMovingComponent } from "../../interface/IComponent";
import { AbstractBullet } from "./AbstractBullet";

export class EnemyBullet extends AbstractBullet implements IMovingComponent {
	public name: string = EComponentName.ENEMY_BULLET;
	public static readonly requiredTextures: string | Array<string> = ETextureName.ENEMY_BULLET;
	public directionAngle: number;
}

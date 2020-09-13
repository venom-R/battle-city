import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IMovingComponent } from "../../interface/IComponent";
import { AbstractBullet } from "./AbstractBullet";

export class PlayerBullet extends AbstractBullet implements IMovingComponent {
	public name: string = EComponentName.PLAYER_BULLET;
	public static readonly requiredTextures: string | Array<string> = ETextureName.PLAYER_BULLET;
	public directionAngle: number;
}

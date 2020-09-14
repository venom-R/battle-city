import { Texture } from "pixi.js";
import { EComponentName } from "../../enum/EComponentName";
import { EEventName } from "../../enum/EEventName";
import { ETankDirection } from "../../enum/ETankDirection";
import { ETextureName } from "../../enum/ETextureName";
import { IMovingComponent } from "../../interface/IComponent";
import { randomItemInArray } from "../../util/helpers";
import { AbstractTank } from "./AbstractTank";

const tankTextureNames: Array<string> = [ETextureName.ENEMY_BLUE, ETextureName.ENEMY_RED, ETextureName.ENEMY_WHITE];

export class EnemyTank extends AbstractTank implements IMovingComponent {
	public name: string = EComponentName.ENEMY_TANK;
	public static readonly requiredTextures: string | Array<string> = tankTextureNames;

	public setTextureSet(texture: Array<Texture>): void {
		const randomTexture: Texture = randomItemInArray(texture);
		super.setTexture(randomTexture);
		this.configureSprite();
	}

	public setRandomDirection(): void {
		const directionKeys: Array<number> = [
			ETankDirection.UP,
			ETankDirection.DOWN,
			ETankDirection.RIGHT,
			ETankDirection.LEFT,
		];
		const randomDirection: number = randomItemInArray(directionKeys);
		this.setDirection(randomDirection);
	}
}

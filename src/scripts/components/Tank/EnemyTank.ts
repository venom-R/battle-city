import { Texture } from "pixi.js";
import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { ITank } from "../../interface/ITank";
import { randomItemInArray } from "../../util/helpers";
import { AbstractTank } from "./AbstractTank";

const tankTextureNames: Array<string> = [ETextureName.ENEMY_BLUE, ETextureName.ENEMY_RED, ETextureName.ENEMY_WHITE];

export class EnemyTank extends AbstractTank implements ITank {
	public name: string = EComponentName.ENEMY_TANK;
	public readonly requiredTextures: string | Array<string> = tankTextureNames;

	public setTextureSet(texture: Array<Texture>): void {
		const randomTexture: Texture = randomItemInArray(texture);
		super.setTexture(randomTexture);
		this.configureSprite();
	}
}

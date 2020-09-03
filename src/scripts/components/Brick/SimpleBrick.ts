import {EComponentType} from "../../enum/EComponentType";
import {ETextureName} from "../../enum/ETextureName";
import {IComponent} from "../../interface/IComponent";
import {AbstractBrick} from "./AbstractBrick";

export class SimpleBrick extends AbstractBrick implements IComponent {
	public isIndestructible: boolean = false;
	public lifePoints: number = 1;
	public readonly type: string = EComponentType.SIMPLE_BRICK;
	public static readonly requiredTextures: string | Array<string> = [
		ETextureName.SMALL_BRICK_1,
		ETextureName.SMALL_BRICK_2,
		ETextureName.SMALL_BRICK_3,
		ETextureName.SMALL_BRICK_4,
	];

	public destroy(): void {
		// TODO maybe here should be explode animation
		this.visible = false;
	}

	public getDamage(damage: number): void {
		this.lifePoints -= damage;
		if (this.lifePoints === 0) {
			this.destroy();
		}
	}

	public setTextureSet(textures: Array<PIXI.Texture>) {
		super.setTextureSet(textures);
		this.imageSet[0].position.set(0, 0);
		this.imageSet[1].position.set(18, 0);
		this.imageSet[2].position.set(0, 18);
		this.imageSet[3].position.set(18, 18);
		this.addChild(...this.imageSet);
	}
}

import { Sprite, Texture } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractBrick } from "./AbstractBrick";

export class IndestructibleBrick extends AbstractBrick implements IComponent {
	public lifePoints: number = 1;
	public readonly isIndestructible: boolean = true;
	public readonly type: string = EComponentType.INDESTRUCTIBLE_BRICK;
	public static readonly requiredTextures: string | Array<string> = ETextureName.INDESTRUCTIBLE_BRICK;

	constructor(texture: Texture) {
		super();
		const sprite = new Sprite(texture);
		this.addChild(sprite);
	}

	public destroy(): void {
		// Indestructible brick
	}

	public getDamage(damage: number): void {
		// Indestructible brick
	}
}

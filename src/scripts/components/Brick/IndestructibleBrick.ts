import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractBrick } from "./AbstractBrick";

export class IndestructibleBrick extends AbstractBrick implements IComponent {
	public lifePoints: number = 1;
	public readonly isIndestructible: boolean = true;
	public readonly type: string = EComponentType.INDESTRUCTIBLE_BRICK;
	public static readonly requiredTextures: string | Array<string> = ETextureName.INDESTRUCTIBLE_BRICK;

	public destroy(): void {
		// Indestructible brick
	}

	public getDamage(damage: number): void {
		// Indestructible brick
	}
}

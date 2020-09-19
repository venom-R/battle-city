import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractBrick } from "./AbstractBrick";

export class IndestructibleBrick extends AbstractBrick implements IComponent {
	public lifePoints: number = 1;
	public readonly isIndestructible: boolean = true;
	public readonly name: string = EComponentName.INDESTRUCTIBLE_BRICK;
	public readonly requiredTextures: string | Array<string> = ETextureName.INDESTRUCTIBLE_BRICK;

	public break(): void {
		// Indestructible brick
	}

	public getDamage(): void {
		// Indestructible brick
	}
}

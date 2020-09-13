import { EComponentName } from "../../enum/EComponentName";
import { EEventName } from "../../enum/EEventName";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export class Base extends AbstractComponent implements IComponent {
	public isDestroyed: boolean = false;
	public name: string = EComponentName.BASE;
	public lifePoints: number = 1;
	public static readonly requiredTextures: string | Array<string> = ETextureName.BASE;

	public getDamage(): void {
		this.lifePoints -= 1;
		if (this.lifePoints === 0) {
			this.break();
		}
	}

	public break(): void {
		this.visible = false;
		this.x = -100;
		this.emit(EEventName.BASE_DESTROYED);
		this.isDestroyed = true;
	}
}

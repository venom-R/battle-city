import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractBrick extends AbstractComponent implements IComponent {
	public abstract lifePoints: number;
	public abstract isIndestructible: boolean;
	public abstract name: string;
	public abstract requiredTextures: string | Array<string>;
	public isDestroyed: boolean = false;

	abstract getDamage(): void;
	abstract break(): void;
}

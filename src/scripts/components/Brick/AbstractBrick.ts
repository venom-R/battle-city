import { IComponent } from "../../interface/IComponent";
import { CollisionDetector } from "../../util/CollisionDetector";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractBrick extends AbstractComponent implements IComponent {
	abstract lifePoints: number;
	abstract isIndestructible: boolean;
	abstract name: string;
	public isDestroyed: boolean = false;

	abstract getDamage(): void;
	abstract break(): void;
}

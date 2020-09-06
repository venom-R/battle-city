import { IComponent } from "../../interface/IComponent";
import { CollisionDetector } from "../../util/CollisionDetector";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractBrick extends AbstractComponent implements IComponent {
	abstract lifePoints: number;
	abstract isIndestructible: boolean;
	abstract name: string;

	abstract getDamage(damage: number): void;
	abstract destroy(): void;
}

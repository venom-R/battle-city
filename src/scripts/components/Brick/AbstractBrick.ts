import {IComponent} from "../../interface/IComponent";
import {AbstractComponent} from "../AbstractComponent/AbstractComponent";

export abstract class AbstractBrick extends AbstractComponent implements IComponent {
	abstract lifePoints: number;
	abstract isIndestructible: boolean;
	abstract type: string;

	abstract getDamage(damage: number): void;
	abstract destroy(): void;
}

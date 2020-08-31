import { Container } from "pixi.js";
import { IComponent } from "../../interface/IComponent";

export abstract class AbstractBrick extends Container implements IComponent {
	abstract lifePoints: number;
	abstract isIndestructible: boolean;
	abstract type: string;

	abstract getDamage(damage: number): void;
	abstract destroy(): void;
}

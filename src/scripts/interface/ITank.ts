import { IMovingComponent } from "./IComponent";
import { ITankController } from "./ITankController";

export interface ITank extends IMovingComponent {
	lifePoints: number;
	isDestroyed: boolean;
	addControl(controller: ITankController): void;
	removeControl(): void;
	fire(): void;
	getDamage(): void;
	break(): void;
}

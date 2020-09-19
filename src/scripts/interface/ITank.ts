import { IBonus } from "./IBonus";
import { IMovingComponent } from "./IComponent";
import { ITankController } from "./ITankController";

export interface ITank extends IMovingComponent {
	lifePoints: number;
	isDestroyed: boolean;
	addControl(controller: ITankController): void;
	removeControl(): void;
	applyBonus(bonus: IBonus): void;
	removeBonus(bonus: IBonus): void;
	fire(): void;
	getDamage(): void;
	break(): void;
	updateBonusTimers(delta: number): void;
}

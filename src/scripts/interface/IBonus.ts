import { IComponent } from "./IComponent";
import { ITank } from "./ITank";

export interface IBonus extends IComponent {
	timer: number;
	timeout: number;
	hide(): void;
	upgrade(tank: ITank): void;
	restore(tank: ITank): void;
}

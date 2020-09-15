import { ITank } from "./ITank";

export interface ITankController {
	injectTank(tank: ITank): void;
	addControl(): void;
	removeControl(): void;
}

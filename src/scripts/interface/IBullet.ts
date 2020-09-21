import { IComponent, IMovingComponent } from "./IComponent";
import { ITank } from "./ITank";

export interface IBullet extends IMovingComponent {
	isFriendlyTarget(target: IComponent): boolean;
	setInitialPoint(tank: ITank): void;
}

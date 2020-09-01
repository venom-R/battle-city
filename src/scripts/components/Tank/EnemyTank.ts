import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";
import { AbstractTank } from "./AbstractTank";

export class EnemyTank extends AbstractTank implements IComponent {
	public type: string = EComponentType.ENEMY_TANK;
}

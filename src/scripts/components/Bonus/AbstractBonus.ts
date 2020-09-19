import { IBonus } from "../../interface/IBonus";
import { ITank } from "../../interface/ITank";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractBonus extends AbstractComponent implements IBonus {
	public abstract name: string;
	public abstract timeout: number;
	public timer: number = 0;

	public abstract upgrade(tank: ITank): void;
	public abstract restore(tank: ITank): void;

	public hide(): void {
		this.x = -100;
		this.visible = false;
	}
}

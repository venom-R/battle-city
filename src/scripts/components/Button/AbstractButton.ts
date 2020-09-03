import {IComponent} from "../../interface/IComponent";
import {AbstractComponent} from "../AbstractComponent/AbstractComponent";

export abstract class AbstractButton extends AbstractComponent implements IComponent {
	abstract type: string;

	protected constructor() {
		super();
		this.buttonMode = true;
		this.interactive = true;
	}
}

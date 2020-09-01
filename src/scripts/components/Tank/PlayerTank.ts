import { Texture } from "pixi.js";
import { IComponent } from "../../interface/IComponent";
import { AbstractTank } from "./AbstractTank";

export class PlayerTank extends AbstractTank implements IComponent {
	public type: string;
}

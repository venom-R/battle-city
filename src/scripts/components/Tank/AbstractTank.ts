import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractTank extends AbstractComponent implements IComponent {
	abstract type: string;
	public vx: number = 0;
	public vy: number = 0;

	public move(): void {
		this.x += this.vx;
		this.y += this.vy;
		console.log(this.vx, this.vx);
	}

	public setTexture(texture: PIXI.Texture) {
		super.setTexture(texture);
		this.image.width = 32;
		this.image.height = 32;
	}
}

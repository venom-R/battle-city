import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractTank extends AbstractComponent implements IComponent {
	abstract type: string;
	public velocity: number = 1;
	public vx: number = 0;
	public vy: number = 0;

	public setTexture(texture: PIXI.Texture) {
		super.setTexture(texture);
		this.image.width = 32;
		this.image.height = 32;
	}

	public move(): void {
		this.x += this.vx;
		this.y += this.vy;
	}

	public goUp(velocity: number): void {
		this.vx = 0;
		this.vy = -velocity;
	}

	public goDown(velocity: number): void {
		this.vx = 0;
		this.vy = velocity;
	}

	public goLeft(velocity: number): void {
		this.vx = -velocity;
		this.vy = 0;
	}

	public goRight(velocity: number): void {
		this.vx = velocity;
		this.vy = 0;
	}

	public fire(): void {
		console.log("FIRE");
	}
}

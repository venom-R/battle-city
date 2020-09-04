import { ETankDirection } from "../../enum/ETankDirection";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractTank extends AbstractComponent implements IComponent {
	abstract type: string;
	public velocity: number = 1;
	public vx: number = 0;
	public vy: number = 0;

	public setTexture(texture: PIXI.Texture) {
		super.setTexture(texture);
		this.configureImage();
	}

	public move(): void {
		this.x += this.vx;
		this.y += this.vy;
	}

	public goUp(velocity: number): void {
		this.vx = 0;
		this.vy = -velocity;
		this.setDirection(ETankDirection.UP);
	}

	public goDown(velocity: number): void {
		this.vx = 0;
		this.vy = velocity;
		this.setDirection(ETankDirection.DOWN);
	}

	public goLeft(velocity: number): void {
		this.vx = -velocity;
		this.vy = 0;
		this.setDirection(ETankDirection.LEFT);
	}

	public goRight(velocity: number): void {
		this.vx = velocity;
		this.vy = 0;
		this.setDirection(ETankDirection.RIGHT);
	}

	public setDirection(direction: number): void {
		if (this.image.angle !== direction) {
			this.image.angle = direction;
		}
	}

	public fire(): void {
		console.log("FIRE");
	}

	private configureImage(): void {
		this.image.anchor.set(0.5, 0.5);
		this.image.position.set(this.image.width / 2, this.image.height / 2);
	}
}

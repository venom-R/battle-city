import { Texture } from "pixi.js";
import { ETankDirection } from "../../enum/ETankDirection";
import { IComponent, IMovingComponent } from "../../interface/IComponent";
import { CollisionDetector } from "../../util/CollisionDetector";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractTank extends AbstractComponent implements IMovingComponent {
	public abstract name: string;
	protected abstract stopMoveAfterHit: boolean;
	public velocity: number = 1;
	public vx: number = 0;
	public vy: number = 0;

	public checkCollision(component: IComponent): boolean {
		return CollisionDetector.hitTestRectangle(this, component, this.stopMoveAfterHit);
	}

	public blockCollision(component: IComponent): void {
		if (this.checkCollision(component)) {
			const collision: string = CollisionDetector.identifyHitSide(this, component);

			switch (collision) {
				case "left":
					this.x = component.x + component.width + 1;
					break;
				case "top":
					this.y = component.y + component.height + 1;
					break;
				case "right":
					this.x = component.x - this.width - 1;
					break;
				case "bottom":
					this.y = component.y - this.height - 1;
					break;
			}
		}
	}

	public setTexture(texture: Texture) {
		super.setTexture(texture);
		this.configureImage();
	}

	public move(): void {
		this.x += this.vx;
		this.y += this.vy;
	}

	public stopMove() {
		this.vx = 0;
		this.vy = 0;
	}

	public setDirection(direction: number): void {
		switch (direction) {
			case ETankDirection.UP:
				this.goUp(this.velocity);
				break;
			case ETankDirection.DOWN:
				this.goDown(this.velocity);
				break;
			case ETankDirection.LEFT:
				this.goLeft(this.velocity);
				break;
			case ETankDirection.RIGHT:
				this.goRight(this.velocity);
				break;
		}
		if (this.image.angle !== direction) {
			this.image.angle = direction;
		}
	}

	public fire(): void {
		console.log("FIRE");
	}

	public get directionAngle(): number {
		if (this.image) {
			return this.image.angle;
		}
		return ETankDirection.UP;
	}

	protected configureImage(): void {
		this.image.anchor.set(0.5, 0.5);
		this.image.position.set(this.image.width / 2, this.image.height / 2);
	}

	protected goUp(velocity: number): void {
		this.vx = 0;
		this.vy = -velocity;
	}

	protected goDown(velocity: number): void {
		this.vx = 0;
		this.vy = velocity;
	}

	protected goLeft(velocity: number): void {
		this.vx = -velocity;
		this.vy = 0;
	}

	protected goRight(velocity: number): void {
		this.vx = velocity;
		this.vy = 0;
	}
}

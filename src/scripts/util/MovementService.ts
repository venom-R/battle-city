import { ETankDirection } from "../enum/ETankDirection";
import { IComponent, IMovingComponent } from "../interface/IComponent";
import { CollisionDetector } from "./CollisionDetector";

export class MovementService {
	protected context: IMovingComponent;

	constructor(context: IMovingComponent) {
		this.context = context;
	}

	public move(): void {
		this.context.x += this.context.vx;
		this.context.y += this.context.vy;
	}

	public stopMove() {
		this.context.vx = 0;
		this.context.vy = 0;
	}

	public setDirection(direction: number): void {
		switch (direction) {
			case ETankDirection.UP:
				this.goUp(this.context.velocity);
				break;
			case ETankDirection.DOWN:
				this.goDown(this.context.velocity);
				break;
			case ETankDirection.LEFT:
				this.goLeft(this.context.velocity);
				break;
			case ETankDirection.RIGHT:
				this.goRight(this.context.velocity);
				break;
		}
	}

	public preventCollision(component: IComponent): void {
		if (this.context.checkCollision(component)) {
			const collision: string = CollisionDetector.identifyHitSide(this.context, component);

			switch (collision) {
				case "left":
					this.context.x = component.x + component.width + 1;
					break;
				case "top":
					this.context.y = component.y + component.height + 1;
					break;
				case "right":
					this.context.x = component.x - this.context.width - 1;
					break;
				case "bottom":
					this.context.y = component.y - this.context.height - 1;
					break;
			}
		}
	}

	public goUp(velocity: number): void {
		this.context.vx = 0;
		this.context.vy = -velocity;
	}

	public goDown(velocity: number): void {
		this.context.vx = 0;
		this.context.vy = velocity;
	}

	public goLeft(velocity: number): void {
		this.context.vx = -velocity;
		this.context.vy = 0;
	}

	public goRight(velocity: number): void {
		this.context.vx = velocity;
		this.context.vy = 0;
	}
}

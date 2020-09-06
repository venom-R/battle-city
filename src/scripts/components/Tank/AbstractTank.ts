import { Texture } from "pixi.js";
import { ETankDirection } from "../../enum/ETankDirection";
import { IComponent, IMovingComponent } from "../../interface/IComponent";
import { CollisionDetector } from "../../util/CollisionDetector";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractTank extends AbstractComponent implements IMovingComponent {
	public abstract name: string;
	protected abstract stopMoveAfterHit: boolean;
	public velocity: number = 1;
	protected _vx: number = 0;
	protected _vy: number = 0;

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
		this.x += this._vx;
		this.y += this._vy;
	}

	public stopMove() {
		this._vx = 0;
		this._vy = 0;
	}

	public goUp(velocity: number): void {
		this._vx = 0;
		this._vy = -velocity;
		this.setDirection(ETankDirection.UP);
	}

	public goDown(velocity: number): void {
		this._vx = 0;
		this._vy = velocity;
		this.setDirection(ETankDirection.DOWN);
	}

	public goLeft(velocity: number): void {
		this._vx = -velocity;
		this._vy = 0;
		this.setDirection(ETankDirection.LEFT);
	}

	public goRight(velocity: number): void {
		this._vx = velocity;
		this._vy = 0;
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

	public get directionAngle(): number {
		if (this.image) {
			return this.image.angle;
		}
		return ETankDirection.UP;
	}

	private configureImage(): void {
		this.image.anchor.set(0.5, 0.5);
		this.image.position.set(this.image.width / 2, this.image.height / 2);
	}
}

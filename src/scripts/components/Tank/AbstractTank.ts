import { Texture } from "pixi.js";
import { EEventName } from "../../enum/EEventName";
import { ETankDirection } from "../../enum/ETankDirection";
import { IComponent, IMovingComponent } from "../../interface/IComponent";
import { CollisionDetector } from "../../util/CollisionDetector";
import { MovementService } from "../../util/MovementService";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractTank extends AbstractComponent implements IMovingComponent {
	public lifePoints: number = 1;
	public abstract name: string;
	public velocity: number = 1;
	public vx: number = 0;
	public vy: number = 0;
	public isDestroyed: boolean = false;
	protected readonly movement = new MovementService(this);

	public fire(): void {
		if (!this.isDestroyed) {
			this.emit(EEventName.TANK_FIRE, this);
		}
	}

	public checkCollision(component: IComponent): boolean {
		return CollisionDetector.hitTestRectangle(this, component);
	}

	public preventCollision(component: IComponent): void {
		this.movement.preventCollision(component);
	}

	public setTexture(texture: Texture) {
		super.setTexture(texture);
		this.configureSprite();
	}

	public break(): void {
		this.x *= -1;
		this.y *= -1;
		this.visible = false;
		this.isDestroyed = true;
		this.emit(EEventName.TANK_DESTROYED, this);
	}

	public getDamage(): void {
		this.lifePoints -= 1;
		if (this.lifePoints === 0) {
			this.break();
		}
	}

	public move(delta: number): void {
		if (!this.isDestroyed) {
			this.movement.move(delta);
		}
	}

	public stopMove() {
		this.movement.stopMove();
	}

	public setDirection(direction: number): void {
		this.movement.setDirection(direction);
		if (this.directionAngle !== direction) {
			this.sprite.angle = direction;
		}
	}

	public get directionAngle(): number {
		if (this.sprite) {
			return this.sprite.angle;
		}
		return ETankDirection.UP;
	}

	protected configureSprite(): void {
		this.sprite.anchor.set(0.5, 0.5);
		this.sprite.position.set(this.sprite.width / 2, this.sprite.height / 2);
	}
}

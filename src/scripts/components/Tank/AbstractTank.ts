import { Texture } from "pixi.js";
import { EEventName } from "../../enum/EEventName";
import { ETankDirection } from "../../enum/ETankDirection";
import { IBonus } from "../../interface/IBonus";
import { IComponent } from "../../interface/IComponent";
import { ITank } from "../../interface/ITank";
import { ITankController } from "../../interface/ITankController";
import { CollisionDetector } from "../../util/CollisionDetector";
import { MovementService } from "../../util/MovementService";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractTank extends AbstractComponent implements ITank {
	public lifePoints: number = 1;
	public speed: number = 1;
	public abstract name: string;
	public velocity: number = 1;
	public vx: number = 0;
	public vy: number = 0;
	public isDestroyed: boolean = false;
	protected readonly movement = new MovementService(this);
	protected controller: ITankController;
	protected bonuses: Map<string, IBonus> = new Map();

	public applyBonus(bonus: IBonus): void {
		this.bonuses.set(bonus.id, bonus);
		bonus.upgrade(this);
		bonus.hide();
	}

	public removeBonus(bonus: IBonus): void {
		bonus.restore(this);
		this.bonuses.delete(bonus.id);
	}

	public updateBonusTimers(delta: number): void {
		if (this.bonuses.size > 0) {
			this.bonuses.forEach((bonus: IBonus) => {
				if (bonus.timeout !== 0) {
					bonus.timer += delta;
					if (bonus.timer >= bonus.timeout) {
						this.removeBonus(bonus);
					}
				}
			});
		}
	}

	public addControl(controller: ITankController): void {
		this.controller = controller;
		this.controller.injectTank(this);
		this.controller.addControl();
	}

	public removeControl(): void {
		this.controller.removeControl();
	}

	public fire(): void {
		if (!this.isDestroyed) {
			this.emit(EEventName.TANK_FIRE, this);
		}
	}

	public checkCollision(component: IComponent): boolean {
		return CollisionDetector.hitTestRectangle(this, component);
	}

	public preventCollision(component: IComponent): void {
		if (this.checkCollision(component)) {
			const collision: string = CollisionDetector.identifyHitSide(this, component);
			CollisionDetector.preventCollision(this, component, collision);
		}
	}

	public setTexture(texture: Texture): void {
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

	public stopMove(): void {
		this.movement.stopMove();
	}

	public setDirection(direction: number): void {
		this.movement.setDirection(direction);
		if (this.getDirectionAngle() !== direction) {
			this.sprite.angle = direction;
		}
	}

	public getDirectionAngle(): number {
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

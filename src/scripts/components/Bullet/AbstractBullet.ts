import { IPoint, Point } from "pixi.js";
import { EComponentName } from "../../enum/EComponentName";
import { ETankDirection } from "../../enum/ETankDirection";
import { IComponent, IMovingComponent } from "../../interface/IComponent";
import { CollisionDetector } from "../../util/CollisionDetector";
import { MovementService } from "../../util/MovementService";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";
import { EnemyTank } from "../Tank/EnemyTank";
import { PlayerTank } from "../Tank/PlayerTank";

type TTank = PlayerTank | EnemyTank;

export abstract class AbstractBullet extends AbstractComponent implements IMovingComponent {
	public isDestroyed: boolean = false;
	public vx: number = 0;
	public vy: number = 0;
	public velocity = 1;
	public abstract directionAngle: number;
	protected readonly movement = new MovementService(this);

	public abstract isFriendlyTarget(target: IComponent): boolean;

	public checkCollision(component: IComponent): boolean {
		return CollisionDetector.hitTestRectangle(this, component);
	}

	public break(): void {
		// todo explode animation
		this.x = -100;
		this.visible = false;
		this.isDestroyed = true;
	}

	public move(delta: number): void {
		this.movement.move(delta);
	}

	public stopMove(): void {
		this.movement.stopMove();
	}

	public setInitialPoint(tank: TTank): void {
		const initialPoint: IPoint = this.getInitialPoint(tank);
		this.position.set(initialPoint.x, initialPoint.y);
	}

	public setDirection(tank: TTank): void {
		this.movement.setDirection(tank.directionAngle);
	}

	protected getInitialPoint(tank: TTank): IPoint {
		switch (tank.directionAngle) {
			case ETankDirection.UP:
				return new Point(tank.x + tank.halfWidth - this.halfWidth, tank.y - this.height);
			case ETankDirection.DOWN:
				return new Point(tank.x + tank.halfWidth - this.halfWidth, tank.y + tank.height);
			case ETankDirection.LEFT:
				return new Point(tank.x - this.width, tank.y + tank.halfHeight - this.halfHeight);
			case ETankDirection.RIGHT:
				return new Point(tank.x + tank.width, tank.y + tank.halfHeight - this.halfHeight);
		}
	}
}

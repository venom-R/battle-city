import { ETankDirection } from "../../../enum/ETankDirection";
import { IAIController } from "../../../interface/IAIController";
import { ITank } from "../../../interface/ITank";
import { Base } from "../../Base/Base";

export class TankAIController implements IAIController {
	private readonly _tank: ITank;
	private readonly _base: Base;
	private _shotInterval = 15;
	private _shotTimer = 0;
	private _shotProbability = 0.7;
	private _directionUpdateInterval = 30;
	private _directionUpdateTimer = 0;
	private _directionUpdateProbability = 0.6;

	constructor(tank: ITank, base: Base) {
		this._tank = tank;
		this._base = base;
	}

	public autoFire(): void {
		if (this._tank.isDestroyed) {
			return;
		}
		this._shotTimer++;
		if (this._shotTimer >= this._shotInterval) {
			this._shotTimer = 0;
			if (Math.random() < this._shotProbability) {
				this._tank.fire();
			}
		}
	}

	public autoMove(): void {
		if (this._tank.isDestroyed) {
			return;
		}
		this._directionUpdateTimer++;
		if (this._base.x === Math.round(this._tank.x) || this._base.y === Math.round(this._tank.y)) {
			this.updateDirection();
		}
		if (this._directionUpdateTimer >= this._directionUpdateInterval) {
			this._directionUpdateTimer = 0;
			if (Math.random() < this._directionUpdateProbability) {
				this.updateDirection();
			}
		}
	}

	private updateDirection(): void {
		this._directionUpdateTimer = 0;
		if (this.dx >= this.dy) {
			if (this._base.x > this._tank.x) {
				this._tank.setDirection(ETankDirection.RIGHT);
			} else {
				this._tank.setDirection(ETankDirection.LEFT);
			}
		} else {
			if (this._base.y > this._tank.y) {
				this._tank.setDirection(ETankDirection.DOWN);
			} else {
				this._tank.setDirection(ETankDirection.UP);
			}
		}
	}

	private get dx(): number {
		if (this._tank && this._base) {
			return Math.abs(this._tank.centerX - this._base.centerX);
		}
	}

	private get dy(): number {
		if (this._tank && this._base) {
			return Math.abs(this._tank.centerY - this._base.centerY);
		}
	}
}

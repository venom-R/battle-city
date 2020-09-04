import { EControls } from "../../enum/EControls";
import { ITankController } from "../../interface/ITankController";
import { KeyboardInteraction } from "../../util/KeyboardInteraction";
import { AbstractTank } from "./AbstractTank";

type TControls = {
	up?: KeyboardInteraction;
	down?: KeyboardInteraction;
	left?: KeyboardInteraction;
	right?: KeyboardInteraction;
	fire?: KeyboardInteraction;
};

export class TankKeyboardController implements ITankController {
	private _tank: AbstractTank;
	private _controls: TControls = {};

	constructor(tank: AbstractTank) {
		this._tank = tank;
	}

	public addControl(): void {
		this._controls.up = new KeyboardInteraction({
			key: EControls.UP,
			onPress: () => {
				this._tank.goUp(this.velocity);
			},
			onRelease: () => {
				if (!this._controls.down.isDown && this._tank.vx === 0) {
					this._tank.vy = 0;
				}
			},
		});

		this._controls.down = new KeyboardInteraction({
			key: EControls.DOWN,
			onPress: () => {
				this._tank.goDown(this.velocity);
			},
			onRelease: () => {
				if (!this._controls.up.isDown && this._tank.vx === 0) {
					this._tank.vy = 0;
				}
			},
		});

		this._controls.left = new KeyboardInteraction({
			key: EControls.LEFT,
			onPress: () => {
				this._tank.goLeft(this.velocity);
			},
			onRelease: () => {
				if (!this._controls.right.isDown && this._tank.vy === 0) {
					this._tank.vx = 0;
				}
			},
		});

		this._controls.right = new KeyboardInteraction({
			key: EControls.RIGHT,
			onPress: () => {
				this._tank.goRight(this.velocity);
			},
			onRelease: () => {
				if (!this._controls.left.isDown && this._tank.vy === 0) {
					this._tank.vx = 0;
				}
			},
		});

		this._controls.fire = new KeyboardInteraction({
			key: EControls.FIRE,
			onPress: () => {
				this._tank.fire();
			},
		});
	}

	public removeControl(): void {
		this._controls.up.unsubscribe();
		this._controls.down.unsubscribe();
		this._controls.left.unsubscribe();
		this._controls.right.unsubscribe();
	}

	private get velocity(): number {
		return this._tank.velocity;
	}
}

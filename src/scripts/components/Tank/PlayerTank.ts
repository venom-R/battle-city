import { EComponentType } from "../../enum/EComponentType";
import { EControls } from "../../enum/EControls";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { KeyboardInteraction } from "../../util/KeyboardInteraction";
import { AbstractTank } from "./AbstractTank";

type TControls = {
	up?: KeyboardInteraction;
	down?: KeyboardInteraction;
	left?: KeyboardInteraction;
	right?: KeyboardInteraction;
	fire?: KeyboardInteraction;
};

export class PlayerTank extends AbstractTank implements IComponent {
	public type: string = EComponentType.PLAYER_TANK;
	public static readonly requiredTextures: string | Array<string> = ETextureName.PLAYER_TANK;
	private _controls: TControls = {};

	public addControl(velocity: number): void {
		this._controls.up = new KeyboardInteraction({
			key: EControls.UP,
			onPress: () => {
				this.goUp(velocity);
			},
			onRelease: () => {
				if (!this._controls.down.isDown && this.vx === 0) {
					this.vy = 0;
				}
			},
		});

		this._controls.down = new KeyboardInteraction({
			key: EControls.DOWN,
			onPress: () => {
				this.goDown(velocity);
			},
			onRelease: () => {
				if (!this._controls.up.isDown && this.vx === 0) {
					this.vy = 0;
				}
			},
		});

		this._controls.left = new KeyboardInteraction({
			key: EControls.LEFT,
			onPress: () => {
				this.goLeft(velocity);
			},
			onRelease: () => {
				if (!this._controls.right.isDown && this.vy === 0) {
					this.vx = 0;
				}
			},
		});

		this._controls.right = new KeyboardInteraction({
			key: EControls.RIGHT,
			onPress: () => {
				this.goRight(velocity);
			},
			onRelease: () => {
				if (!this._controls.left.isDown && this.vy === 0) {
					this.vx = 0;
				}
			},
		});

		this._controls.fire = new KeyboardInteraction({
			key: EControls.FIRE,
			onPress: () => {
				this.fire();
			},
		});
	}

	public removeControl(): void {
		this._controls.up.unsubscribe();
		this._controls.down.unsubscribe();
		this._controls.left.unsubscribe();
		this._controls.right.unsubscribe();
	}
}

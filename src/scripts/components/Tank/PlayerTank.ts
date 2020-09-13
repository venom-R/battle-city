import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IMovingComponent } from "../../interface/IComponent";
import { ITankController } from "../../interface/ITankController";
import { AbstractTank } from "./AbstractTank";
import { TankKeyboardController } from "./TankKeyboardController";

export class PlayerTank extends AbstractTank implements IMovingComponent {
	public name: string = EComponentName.PLAYER_TANK;
	public static readonly requiredTextures: string | Array<string> = ETextureName.PLAYER_TANK;
	private _keyboardController: ITankController;

	public addControl() {
		this._keyboardController = new TankKeyboardController(this);
		this._keyboardController.addControl();
	}

	public removeControl() {
		this._keyboardController.removeControl();
	}
}

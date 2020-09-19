import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IBonus } from "../../interface/IBonus";
import { ITank } from "../../interface/ITank";
import { AbstractBonus } from "./AbstractBonus";

export class BonusImmortal extends AbstractBonus implements IBonus {
	public name: string = EComponentName.BONUS_IMMORTAL;
	public readonly requiredTextures: string | Array<string> = ETextureName.BONUS_IMMORTAL;
	public timeout: number = 60 * 2;
	private _originalLifePoints: number;

	public upgrade(tank: ITank): void {
		this._originalLifePoints = tank.lifePoints;
		tank.lifePoints = 999999;
		tank.alpha = 0.5;
		console.time("BonusImmortal");
	}

	public restore(tank: ITank): void {
		tank.lifePoints = this._originalLifePoints;
		tank.alpha = 1;
		console.timeEnd("BonusImmortal");
	}
}

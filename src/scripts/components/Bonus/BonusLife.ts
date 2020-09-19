import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IBonus } from "../../interface/IBonus";
import { ITank } from "../../interface/ITank";
import { AbstractBonus } from "./AbstractBonus";

export class BonusLife extends AbstractBonus implements IBonus {
	public name: string = EComponentName.BONUS_LIFE;
	public static readonly requiredTextures: string | Array<string> = ETextureName.BONUS_LIFE;
	public timeout: number = 0;

	public upgrade(tank: ITank): void {
		tank.lifePoints += 1;
	}

	public restore(tank: ITank): void {
		// Bonus live is added forever, so this method is unnecessary
	}
}

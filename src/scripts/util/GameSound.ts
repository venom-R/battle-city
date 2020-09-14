import { ESoundNames } from "../enum/ESoundNames";
import { ISound } from "../interface/ISound";
import { SoundManager } from "./SoundManager";

export class GameSound extends SoundManager implements ISound {
	public bonus(): void {
		this.play(ESoundNames.BONUS);
	}

	public explode(): void {
		this.play(ESoundNames.EXPLODE);
	}

	public hit(): void {
		this.play(ESoundNames.HIT);
	}

	public lose(): void {
		this.play(ESoundNames.LOSE);
	}

	public shot(): void {
		this.play(ESoundNames.SHOT);
	}

	public win(): void {
		this.play(ESoundNames.WIN);
	}
}

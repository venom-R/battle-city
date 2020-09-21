import { Loader } from "pixi.js";
import { ISound } from "../interface/ISound";
import { Emitter } from "../util/Emitter";
import { StateMachine } from "../util/StateMachine";

export class GameModel {
	public readonly stateMachine = new StateMachine();
	public readonly loader: Loader = Loader.shared;
	public readonly emitter = new Emitter();
	public readonly pointPerKill: number = 100;
	public loadingProgress: number = 0;
	public isAssetsLoaded: boolean = false;
	public playerVelocity: number = 1;
	public enemyVelocity: number = 1;
	public bulletVelocity: number = 5;
	public isWin: boolean = false;
	private _totalKills: number = 0;
	private _soundManager: ISound;
	private readonly _isMuteByDefault: boolean = false;

	public addKill(): void {
		this._totalKills += 1;
	}

	public get totalPoints(): number {
		return this._totalKills * this.pointPerKill;
	}

	public injectSoundManager(soundManager: ISound): void {
		this._soundManager = soundManager;
		this._soundManager.isMute = this._isMuteByDefault;
	}

	public get soundManager(): ISound {
		return this._soundManager;
	}

	public get isMute(): boolean {
		return this._soundManager.isMute;
	}

	public enableSounds(): void {
		this._soundManager.isMute = false;
	}

	public disableSounds(): void {
		this._soundManager.isMute = true;
	}
}

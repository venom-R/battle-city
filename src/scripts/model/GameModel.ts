import { Loader } from "pixi.js";
import Emitter from "../util/Emitter";
import { StateMachine } from "../util/StateMachine";

export class GameModel {
	public readonly stateMachine = new StateMachine();
	public readonly loader: Loader = Loader.shared;
	public readonly emitter = new Emitter();
	public loadingProgress: number = 0;
	public isAssetsLoaded: boolean = false;
	public playerVelocity: number = 1;
	public enemyVelocity: number = 1;
}

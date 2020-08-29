import { Loader } from "pixi.js";
import { StateMachine } from "../util/StateMachine";

export class GameModel {
	public readonly stateMachine = new StateMachine();
	public readonly loader: Loader = Loader.shared;
	public loadingProgress: number = 0;
	public isAssetsLoaded: boolean = false;
}

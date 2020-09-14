import { Dictionary } from "lodash";
import { Loader, LoaderResource, Ticker } from "pixi.js";
import { EControls } from "../enum/EControls";
import { EEventName } from "../enum/EEventName";
import { ESoundNames } from "../enum/ESoundNames";
import { EStateName } from "../enum/EStateName";
import { ETextureName } from "../enum/ETextureName";
import { IState } from "../interface/IState";
import { IStateContext } from "../interface/IStateContext";
import { GameModel } from "../model/GameModel";
import { GameSound } from "../util/GameSound";
import { KeyboardInteraction } from "../util/KeyboardInteraction";
import { GameView } from "../view/GameView";
import { EndState } from "./state/EndState";
import { GameState } from "./state/GameState";
import { LoadingState } from "./state/LoadingState";
import { MenuState } from "./state/MenuState";

export class GameController {
	protected readonly model: GameModel;
	protected readonly view: GameView;
	private _ticker: Ticker;

	constructor(model: GameModel, view: GameView) {
		this.model = model;
		this.view = view;
		this.registerEventListeners();
		this.loadAssets();
		this.initializeStates();
		this.createTicker();
	}

	public get currentState(): IState {
		return this.model.stateMachine.currentState;
	}

	protected transition(nextState: string): void {
		this.model.stateMachine.transition(nextState);
	}

	private initializeStates(): void {
		const context: IStateContext = {
			model: this.model,
			view: this.view,
		};
		const loadingState = new LoadingState(context);
		const states: Dictionary<IState> = {
			[EStateName.LOADING]: loadingState,
			[EStateName.MENU]: new MenuState(context),
			[EStateName.GAME]: new GameState(context),
			[EStateName.END]: new EndState(context),
		};
		this.model.stateMachine.initialize({
			states: states,
			currentState: loadingState,
		});
	}

	private registerEventListeners(): void {
		const { emitter } = this.model;
		emitter.on(EEventName.ASSETS_LOADED, (resources: Partial<Record<string, LoaderResource>>) => {
			this.view.textures = { ...resources[ETextureName.ROOT].textures };
			this.model.injectSoundManager(new GameSound(resources));
			this.model.isAssetsLoaded = true;
		});
		emitter.on(EEventName.ASSETS_LOADING_PROGRESS, (progress: number) => {
			this.model.loadingProgress = progress;
		});
		emitter.on(EEventName.ASSETS_LOADING_FAILURE, (error: Error) => {
			console.error(error);
			this.tickerStop();
		});
		emitter.on(EEventName.GAME_OVER, () => {
			setTimeout(() => {
				this.transition(EStateName.END);
				this.tickerStop();
			}, 1000);
		});
		new KeyboardInteraction({
			key: EControls.MUTE,
			onPress: () => {
				this.toggleSounds();
			},
		});
	}

	private loadAssets(): void {
		const { emitter } = this.model;
		this.model.loader
			.add(ETextureName.ROOT)
			.add(ESoundNames.BONUS)
			.add(ESoundNames.SHOT)
			.add(ESoundNames.EXPLODE)
			.add(ESoundNames.HIT)
			.add(ESoundNames.WIN)
			.add(ESoundNames.LOSE)
			.load((_loader: Loader, resources: Partial<Dictionary<LoaderResource>>) => {
				emitter.emit(EEventName.ASSETS_LOADED, resources);
			});
		this.model.loader.onProgress.add((loader: Loader) => {
			emitter.emit(EEventName.ASSETS_LOADING_PROGRESS, loader.progress);
		});
		this.model.loader.onError.add((error) => {
			emitter.emit(EEventName.ASSETS_LOADING_FAILURE, error);
		});
	}

	private gameLoop(delta: number) {
		if (this.currentState && this.currentState.updateFrame) {
			this.currentState.updateFrame(delta);
		}
	}

	private createTicker(): void {
		this._ticker = Ticker.shared;
		this._ticker.add(this.gameLoop, this);
	}

	private tickerStart(): void {
		this._ticker.start();
	}

	private tickerStop(): void {
		this._ticker.stop();
	}

	private toggleSounds(): void {
		if (this.model.isMute) {
			this.model.enableSounds();
		} else {
			this.model.disableSounds();
		}
	}
}

import { Application, Container, DisplayObject, ITextureDictionary, Sprite } from "pixi.js";
import { COLORS } from "../constants/colors";
import { SETTINGS } from "../constants/settings";
import { ISize } from "../interface/ISize";
import Emitter from "../util/Emitter";

const APP_CONFIG = {
	width: SETTINGS.WIDTH,
	height: SETTINGS.HEIGHT,
	antialiasing: true,
	transparent: false,
	backgroundColor: COLORS.APP_COLOR,
	resolution: 1,
};

export class GameView {
	public textures: ITextureDictionary = {};
	private _canvasContainer: HTMLElement;
	private _app: Application;
	public readonly emitter = new Emitter();

	constructor() {
		this.initializeApplication();
	}

	public addToStage<TChildren extends DisplayObject[]>(...children: TChildren): void {
		this._app.stage.addChild(...children);
	}

	public get app(): Application {
		return this._app;
	}

	public get rendererSize(): ISize {
		return {
			height: this._app.renderer.height,
			width: this._app.renderer.width,
		};
	}

	public alignComponentCenterX(component: Container | Sprite): void {
		component.x = (this.rendererSize.width - component.width) / 2;
	}

	public alignComponentCenterY(component: Container | Sprite): void {
		component.y = (this.rendererSize.height - component.height) / 2;
	}

	private initializeApplication(): void {
		this._canvasContainer = document.getElementById("canvasContainer");
		this._app = new Application(APP_CONFIG);
		this._canvasContainer.appendChild(this._app.view);
	}
}

import { Application, Container, DisplayObject, ITextureDictionary, Sprite, Texture } from "pixi.js";
import { COLORS } from "../constants/colors";
import { SETTINGS } from "../constants/settings";
import { ISize } from "../interface/ISize";

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

	constructor() {
		this.initializeApplication();
	}

	public addToStage<TChildren extends DisplayObject[]>(...children: TChildren): void {
		this._app.stage.addChild(...children);
	}

	public get app(): Application {
		return this._app;
	}

	public get screenSize(): ISize {
		return {
			height: this._app.screen.height,
			width: this._app.screen.width,
		};
	}

	public getTexture(textureName: string): Texture {
		if (this.textures) {
			return this.textures[textureName];
		}
		throw new Error("Textures has not been loaded!");
	}

	public alignComponentCenterX(component: Container | Sprite): void {
		component.x = (this.screenSize.width - component.width) / 2;
	}

	public alignComponentCenterY(component: Container | Sprite): void {
		component.y = (this.screenSize.height - component.height) / 2;
	}

	private initializeApplication(): void {
		this._canvasContainer = document.getElementById("canvasContainer");
		this._app = new Application(APP_CONFIG);
		this._canvasContainer.appendChild(this._app.view);
	}
}

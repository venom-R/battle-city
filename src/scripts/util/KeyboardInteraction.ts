import { isFunction } from "lodash";
import { IKeyboardInteractionOptions } from "../interface/IKeyboardInteractionOptions";

type TKeyboardHandler = (e: KeyboardEvent) => void;

export class KeyboardInteraction {
	public key: string;
	private _isDown: boolean = false;
	private _isUp: boolean = true;
	private _onPress: TKeyboardHandler;
	private _onRelease: TKeyboardHandler;
	private _onDownListener: TKeyboardHandler;
	private _onUpListener: TKeyboardHandler;

	constructor(options: IKeyboardInteractionOptions) {
		this.key = options.key;
		this._onPress = options.onPress;
		this._onRelease = options.onRelease;
		this.attachEventListeners();
	}

	public get isDown(): boolean {
		return this._isDown;
	}

	public get isUp(): boolean {
		return this._isUp;
	}

	public get onPress(): TKeyboardHandler {
		return this._onPress;
	}

	public set onPress(value: TKeyboardHandler) {
		if (!isFunction(value)) {
			throw new Error("onPress should be a function!");
		}
		this._onPress = value;
	}

	public get onRelease(): TKeyboardHandler {
		return this._onRelease;
	}

	public set onRelease(value: TKeyboardHandler) {
		if (!isFunction(value)) {
			throw new Error("onRelease should be a function!");
		}
		this._onRelease = value;
	}

	public unsubscribe(): void {
		if (this._onDownListener) {
			window.removeEventListener("keydown", this._onDownListener);
		}
		if (this._onUpListener) {
			window.removeEventListener("keyup", this._onUpListener);
		}
	}

	private attachEventListeners(): void {
		if (this.downHandler) {
			this._onDownListener = this.downHandler.bind(this);
			window.addEventListener("keydown", this._onDownListener, false);
		}
		if (this.upHandler) {
			this._onUpListener = this.upHandler.bind(this);
			window.addEventListener("keyup", this._onUpListener, false);
		}
	}

	private downHandler(event: KeyboardEvent): void {
		if (event.code === this.key) {
			if (this._isUp && this._onPress) {
				this.onPress(event);
			}
			this._isDown = true;
			this._isUp = false;
			event.preventDefault();
		}
	}

	private upHandler(event: KeyboardEvent): void {
		if (event.code === this.key) {
			if (this._isDown && this._onRelease) {
				this.onRelease(event);
			}
			this._isDown = false;
			this._isUp = true;
			event.preventDefault();
		}
	}
}

import { isFunction } from "lodash";

type TKeyboardHandler = (e: KeyboardEvent) => void;

export class KeyboardInteraction {
	public key: string;
	private _isDown: boolean = false;
	private _isUp: boolean = true;
	private _onPress: TKeyboardHandler;
	private _onRelease: TKeyboardHandler;
	private _onDownListener: TKeyboardHandler;
	private _onUpListener: TKeyboardHandler;

	constructor(key: string) {
		this.key = key;
		this.attachEventListeners();
	}

	public get onPress(): Function {
		return this._onPress;
	}

	public set onPress(value: Function) {
		if (!isFunction(value)) {
			throw new Error("onPress should be a function!");
		}
		this._onPress = value;
	}

	public get onRelease(): Function {
		return this._onRelease;
	}

	public set onRelease(value: Function) {
		if (!isFunction(value)) {
			throw new Error("onRelease should be a function!");
		}
		this._onRelease = value;
	}

	public unsubscribe(): void {
		window.removeEventListener("keydown", this._onDownListener);
		window.removeEventListener("keyup", this._onUpListener);
	}

	private attachEventListeners(): void {
		this._onDownListener = this.downHandler.bind(this);
		this._onUpListener = this.upHandler.bind(this);
		window.addEventListener("keydown", this._onDownListener, false);
		window.addEventListener("keyup", this._onUpListener, false);
	}

	private downHandler(event: KeyboardEvent): void {
		if (event.key === this.key) {
			if (this._isUp && this._onPress) {
				this.onPress();
			}
			this._isDown = true;
			this._isUp = false;
			event.preventDefault();
		}
	}

	private upHandler(event: KeyboardEvent): void {
		if (event.key === this.key) {
			if (this._isDown && this._onRelease) {
				this.onRelease();
			}
			this._isDown = false;
			this._isUp = true;
			event.preventDefault();
		}
	}
}

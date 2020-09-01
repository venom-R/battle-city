import { DisplayObject } from "pixi.js";

export interface IComponent extends DisplayObject {
	type: string;
}

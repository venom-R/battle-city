import {Container, Texture} from "pixi.js";

export interface IComponent extends Container {
	type: string;
	setTexture(texture: Texture): void;
	setTextureSet(textures: Array<Texture>): void;
}

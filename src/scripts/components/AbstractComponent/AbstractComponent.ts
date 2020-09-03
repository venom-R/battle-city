import {Container, Sprite, Texture} from "pixi.js";
import {IComponent} from "../../interface/IComponent";

export abstract class AbstractComponent extends Container implements IComponent {
	public abstract type: string;
	public image: Sprite;
	private _texture: Texture;
	private _textureSet: Array<Texture> = [];
	protected imageSet: Array<Sprite> = [];

	public setTexture(texture: Texture): void {
		this._texture = texture;
		this.image = new Sprite(texture);
		this.addChild(this.image);
	}

	public setTextureSet(textures: Array<PIXI.Texture>): void {
		this._textureSet = [...textures];
		this._textureSet.forEach((texture: Texture) => {
			this.imageSet.push(new Sprite(texture));
		});
	}
}

import { Container, Sprite, Texture } from "pixi.js";
import { IComponent } from "../../interface/IComponent";
import { v4 as uuid } from "uuid";

export abstract class AbstractComponent extends Container implements IComponent {
	public readonly id: string = uuid();
	public abstract name: string;
	public sprite: Sprite;
	public requiredTextures: string | Array<string>;
	protected texture: Texture;
	protected textureSet: Array<Texture> = [];
	protected spriteSet: Array<Sprite> = [];

	public setTexture(texture: Texture): void {//What happens with previous texture if this.sprite was allready created?
		this.texture = texture;
		this.sprite = new Sprite(texture);
		this.addChild(this.sprite);
	}

	public setTextureSet(textures: Array<Texture>): void {
		this.textureSet = [...textures];
		this.textureSet.forEach((texture: Texture) => {
			this.spriteSet.push(new Sprite(texture));
		});
	}

	// Getters for collision detection
	public get halfWidth(): number {
		return this.width / 2;
	}

	public get halfHeight(): number {
		return this.height / 2;
	}

	public get centerX(): number {
		return this.x + this.halfWidth;
	}

	public get centerY(): number {
		return this.y + this.halfHeight;
	}
}

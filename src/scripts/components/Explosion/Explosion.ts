import { AnimatedSprite } from "pixi.js";
import { EComponentName } from "../../enum/EComponentName";
import { ETextureName } from "../../enum/ETextureName";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export class Explosion extends AbstractComponent implements IComponent {
	public name: string = EComponentName.EXPLOSION;
	public isDestroyed: boolean;
	public sprite: AnimatedSprite;
	private static _frames: number = 16;
	public static readonly requiredTextures: string | Array<string> = Explosion.generateTextureNames();

	public setTextureSet(textures: Array<PIXI.Texture>): void {
		this.textureSet = [...textures];
		this.configureSprite();
	}

	private configureSprite() {
		this.sprite = new AnimatedSprite(this.textureSet);
		this.sprite.animationSpeed = 0.4;
		this.sprite.play();
		this.sprite.loop = false;
		this.sprite.anchor.set(0.5, 0.5);
		this.sprite.position.set(0, 0);
		this.addChild(this.sprite);
		this.sprite.onComplete = () => this.onComplete();
	}

	private onComplete(): void {
		this.x = -100;
		this.visible = false;
	}

	private static generateTextureNames(): Array<string> {
		let textures: Array<string> = [];
		for (let i = 1; i <= Explosion._frames; i++) {
			textures.push(`${ETextureName.EXPLOSION}_${i}`);
		}
		return textures;
	}
}

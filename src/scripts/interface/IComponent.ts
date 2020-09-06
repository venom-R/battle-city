import { Container, Texture } from "pixi.js";

export interface IComponent extends Container, ICollisionProps {
	name: string;
	setTexture(texture: Texture): void;
	setTextureSet(textures: Array<Texture>): void;
}

export interface IMovingComponent extends IComponent {
	directionAngle: number;
	checkCollision(component: IComponent): boolean;
	move(): void;
	stopMove(): void;
}

interface ICollisionProps {
	centerX: number;
	centerY: number;
	halfWidth: number;
	halfHeight: number;
}

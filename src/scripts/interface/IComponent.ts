import { Container, Texture } from "pixi.js";

export interface IComponent extends Container, ICollisionProps {
	id: string;
	name: string;
	setTexture(texture: Texture): void;
	setTextureSet(textures: Array<Texture>): void;
}

export interface IMovingComponent extends IComponent {
	velocity: number;
	vx: number;
	vy: number;
	directionAngle?: number;
	checkCollision(component: IComponent): boolean;
	move(delta: number): void;
	stopMove(): void;
}

interface ICollisionProps {
	centerX: number;
	centerY: number;
	halfWidth: number;
	halfHeight: number;
}

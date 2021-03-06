import { Container, Texture } from "pixi.js";

export interface IComponent extends Container, ICollisionProps {
	id: string;
	name: string;
	requiredTextures?: string | Array<string>;
	isDestroyed?: boolean;
	setTexture(texture: Texture): void;
	setTextureSet(textures: Array<Texture>): void;
	getDamage?(): void;
	break?(): void;
}

export interface IMovingComponent extends IComponent {
	speed: number;
	velocity: number;
	vx: number;
	vy: number;
	getDirectionAngle?(): number;
	hit(component: IComponent): boolean;
	preventCollision?(component: IComponent): void;
	move(delta: number): void;
	stopMove(): void;
	setDirection(direction: number): void;
}

interface ICollisionProps {
	centerX: number;
	centerY: number;
	halfWidth: number;
	halfHeight: number;
}

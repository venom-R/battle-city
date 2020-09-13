import { ETankDirection } from "../enum/ETankDirection";
import { IComponent, IMovingComponent } from "../interface/IComponent";

export class CollisionDetector {
	public static hitTestRectangle(c1: IComponent, c2: IComponent): boolean {
		let hit: boolean;

		const vx: number = c1.centerX - c2.centerX;
		const vy: number = c1.centerY - c2.centerY;

		const combinedHalfWidths: number = c1.halfWidth + c2.halfWidth;
		const combinedHalfHeights: number = c1.halfHeight + c2.halfHeight;

		if (Math.abs(vx) < combinedHalfWidths) {
			hit = Math.abs(vy) < combinedHalfHeights;
		} else {
			hit = false;
		}

		return hit;
	}

	public static identifyHitSide(moving: IMovingComponent, fixed: IComponent): string {
		//Left
		if (moving.x < fixed.x + fixed.width && moving.directionAngle === ETankDirection.LEFT) {
			return "left";
		}

		//Top
		if (moving.y < fixed.y + fixed.height && moving.directionAngle === ETankDirection.UP) {
			return "top";
		}

		//Right
		if (moving.x + moving.width > fixed.x && moving.directionAngle === ETankDirection.RIGHT) {
			return "right";
		}

		//Bottom
		if (moving.y + moving.height > fixed.y && moving.directionAngle === ETankDirection.DOWN) {
			return "bottom";
		}
	}

	public static preventCollision(moving: IMovingComponent, fixed: IComponent, collisionSide: string): void {
		switch (collisionSide) {
			case "left":
				moving.x = fixed.x + fixed.width + 1;
				break;
			case "top":
				moving.y = fixed.y + fixed.height + 1;
				break;
			case "right":
				moving.x = fixed.x - moving.width - 1;
				break;
			case "bottom":
				moving.y = fixed.y - moving.height - 1;
				break;
		}
	}
}

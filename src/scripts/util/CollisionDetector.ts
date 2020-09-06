import { ETankDirection } from "../enum/ETankDirection";
import { IComponent, IMovingComponent } from "../interface/IComponent";

export class CollisionDetector {
	public static hitTestRectangle(moving: IMovingComponent, fixed: IComponent, stopMovingAfterHit?: boolean): boolean {
		let hit: boolean;

		const vx: number = moving.centerX - fixed.centerX;
		const vy: number = moving.centerY - fixed.centerY;

		const combinedHalfWidths: number = moving.halfWidth + fixed.halfWidth;
		const combinedHalfHeights: number = moving.halfHeight + fixed.halfHeight;

		if (Math.abs(vx) < combinedHalfWidths) {
			hit = Math.abs(vy) < combinedHalfHeights;
		} else {
			hit = false;
		}

		if (hit && stopMovingAfterHit) {
			moving.stopMove();
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
}

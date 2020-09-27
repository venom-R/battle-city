import { isFunction } from "lodash";
import { IAIController } from "../../../interface/IAIController";
import { IComponent } from "../../../interface/IComponent";
import { ITank } from "../../../interface/ITank";
import { CollisionDetector } from "../../../util/CollisionDetector";

export class TankAIControlledProxyCreator {
	private readonly _controller: IAIController;

	constructor(controller: IAIController) {
		this._controller = controller;
	}

	public create(tank: ITank): ITank {
		const handler = {
			get: (target: ITank, prop: keyof ITank, receiver: any) => {
				if (target[prop]) {
					switch (prop) {
						case "move"://add all this strings to global utilits names
							return this.createMoveProxy(target[prop], tank);
						case "preventCollision"://add all this strings to global utilits names
							return this.createPreventCollisionProxy(target[prop], tank);
						default:
							if (isFunction(target[prop])) {
								return (target[prop] as Function).bind(target);
							}
							return Reflect.get(target, prop, receiver);
					}
				}
			},
		};
		return new Proxy(tank, handler);
	}

	private createMoveProxy(originalMethod: Function, context: ITank): (delta: number) => void {
		return (delta: number) => {
			this._controller.autoFire();
			this._controller.autoMove();
			originalMethod.call(context, delta);
		};
	}

	private createPreventCollisionProxy(originalMethod: Function, context: ITank): (component: IComponent) => void {
		return (component: IComponent) => {
			if (context.hit(component)) {
				this._controller.collision = CollisionDetector.identifyHitSide(context, component);
				originalMethod.call(context, component);
			}
		};
	}
}

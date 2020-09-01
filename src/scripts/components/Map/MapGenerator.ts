import { Container } from "pixi.js";
import { Base } from "../Base/Base";
import { IndestructibleBrick } from "../Brick/IndestructibleBrick";
import { SimpleBrick } from "../Brick/SimpleBrick";
import { Leaf } from "../Leaf/Leaf";
import { PlayerTank } from "../Tank/PlayerTank";
import { Water } from "../Water/Water";
import { initialSchema } from "./initialSchema";

type TComponentConstructor = new (...params: Array<any>) => any;

const componentConstructors: Array<TComponentConstructor> = [
	null,
	SimpleBrick,
	IndestructibleBrick,
	Water,
	Leaf,
	Base,
	PlayerTank,
];

export class MapGenerator {
	private readonly _cellSize: number = 36;
	private readonly _initialSchema: Array<Array<number>> = initialSchema;
	private readonly _componentConstructors: Array<TComponentConstructor> = componentConstructors;
	private _componentsCreator: Function;

	constructor(componentsCreator: Function) {
		this._componentsCreator = componentsCreator;
	}

	public createSchema() {
		return this._initialSchema.map((row: Array<number>, rowIndex: number) => {
			return row.map((cell: number, cellIndex: number) => {
				const Component: TComponentConstructor = this._componentConstructors[cell];
				if (Component !== null) {
					const component: Container = this._componentsCreator(Component);
					component.position.set(cellIndex * this._cellSize, rowIndex * this._cellSize);
					return component;
				}
				return 0;
			});
		});
	}
}

import { IPoint, Point } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";
import { Base } from "../Base/Base";
import { IndestructibleBrick } from "../Brick/IndestructibleBrick";
import { SimpleBrick } from "../Brick/SimpleBrick";
import { Leaf } from "../Leaf/Leaf";
import { EnemyTank } from "../Tank/EnemyTank";
import { PlayerTank } from "../Tank/PlayerTank";
import { Water } from "../Water/Water";
import { initialSchema } from "./initialSchema";
import { Map } from "./Map";

type TComponentConstructor = new (...params: Array<any>) => any;

const componentConstructors: Array<TComponentConstructor> = [
	null,
	SimpleBrick,
	IndestructibleBrick,
	Water,
	Leaf,
	Base,
	PlayerTank,
	EnemyTank,
];

export class MapGenerator {
	public playerTank: PlayerTank;
	public base: Base;
	public waterComponents: Array<Water> = [];
	public enemyTanks: Array<EnemyTank> = [];
	public schema: Array<IComponent> = [];
	public emptyCells: Array<IPoint> = [];
	private readonly _cellSize: number = 36;
	private readonly _initialSchema: Array<Array<number>> = initialSchema;
	private readonly _componentConstructors: Array<TComponentConstructor> = componentConstructors;
	private readonly _componentsCreator: Function;

	constructor(componentsCreator: Function) {
		this._componentsCreator = componentsCreator;
	}

	public createMap(Map: new (generator: this) => Map): Map {
		this.createSchema();
		return new Map(this);
	}

	private createSchema(): Array<IComponent> {
		this._initialSchema.forEach((row: Array<number>, rowIndex: number) => {
			return row.forEach((cell: number, cellIndex: number) => {
				const Component: TComponentConstructor = this._componentConstructors[cell];
				const point = new Point(cellIndex * this._cellSize, rowIndex * this._cellSize);
				if (Component !== null) {
					const component: IComponent = this._componentsCreator(Component);
					component.position.set(point.x, point.y);
					this.schema.push(component);
					this.groupComponents(component);
				} else {
					this.addEmptyCell(point);
				}
			});
		});
		return this.schema;
	}

	private groupComponents(component: IComponent): void {
		switch (component.type) {
			case EComponentType.PLAYER_TANK:
				this.playerTank = component as PlayerTank;
				break;
			case EComponentType.BASE:
				this.base = component as Base;
				break;
			case EComponentType.WATER:
				this.waterComponents.push(component as Water);
				break;
			case EComponentType.ENEMY_TANK:
				this.enemyTanks.push(component as EnemyTank);
				break;
		}
	}

	private addEmptyCell(point: IPoint) {
		this.emptyCells.push(point);
	}
}

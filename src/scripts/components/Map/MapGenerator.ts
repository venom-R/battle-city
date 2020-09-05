import { IPoint, Point } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";
import { IMapProps } from "../../interface/IMapProps";
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
	private _player: PlayerTank;
	private _base: Base;
	private _waterComponents: Array<Water> = [];
	private _enemies: Array<EnemyTank> = [];
	private _schema: Array<IComponent> = [];
	private _emptyCells: Array<IPoint> = [];
	private readonly _cellSize: number = 36;
	private readonly _initialSchema: Array<Array<number>> = initialSchema;
	private readonly _componentConstructors: Array<TComponentConstructor> = componentConstructors;
	private readonly _componentsCreator: Function;

	constructor(componentsCreator: Function) {
		this._componentsCreator = componentsCreator;
	}

	public generate(Map: new (generator: IMapProps) => Map): Map {
		this.createSchema();
		return new Map(this.mapProps);
	}

	private createSchema(): void {
		this._initialSchema.forEach((row: Array<number>, rowIndex: number) => {
			return row.forEach((cell: number, cellIndex: number) => {
				const Component: TComponentConstructor = this._componentConstructors[cell];
				const point = new Point(cellIndex * this._cellSize, rowIndex * this._cellSize);
				if (Component !== null) {
					const component: IComponent = this._componentsCreator(Component);
					component.position.set(point.x, point.y);
					this._schema.push(component);
					this.groupComponents(component);
				} else {
					this.addEmptyCell(point);
				}
			});
		});
	}

	private groupComponents(component: IComponent): void {
		switch (component.name) {
			case EComponentType.PLAYER_TANK:
				this._player = component as PlayerTank;
				break;
			case EComponentType.BASE:
				this._base = component as Base;
				break;
			case EComponentType.WATER:
				this._waterComponents.push(component as Water);
				break;
			case EComponentType.ENEMY_TANK:
				this._enemies.push(component as EnemyTank);
				break;
		}
	}

	private addEmptyCell(point: IPoint) {
		this._emptyCells.push(point);
	}

	private get mapProps(): IMapProps {
		return {
			player: this._player,
			base: this._base,
			waterComponents: this._waterComponents,
			enemies: this._enemies,
			schema: this._schema,
			emptyCells: this._emptyCells,
		};
	}
}

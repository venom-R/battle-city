import { IPoint, Point } from "pixi.js";
import { EComponentName } from "../../enum/EComponentName";
import { ETankDirection } from "../../enum/ETankDirection";
import { IComponent } from "../../interface/IComponent";
import { IMapProps } from "../../interface/IMapProps";
import { TBrick } from "../../type/TBrick";
import { Base } from "../Base/Base";
import { IndestructibleBrick } from "../Brick/IndestructibleBrick";
import { SimpleBrick } from "../Brick/SimpleBrick";
import { Leaf } from "../Leaf/Leaf";
import { EnemyTank } from "../Tank/EnemyTank";
import { PlayerTank } from "../Tank/PlayerTank";
import { Water } from "../Water/Water";
import { Battlefield } from "./Battlefield";

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
	private _waterComponents: Map<string, Water> = new Map();
	private _enemies: Map<string, EnemyTank> = new Map();
	private _emptyCells: Array<IPoint> = [];
	private _walls: Map<string, TBrick> = new Map();
	private _leaves: Map<string, Leaf> = new Map();
	private readonly _cellSize: number = 36;
	private readonly _componentConstructors: Array<TComponentConstructor> = componentConstructors;
	private readonly _componentsCreator: Function;

	constructor(componentsCreator: Function) {
		this._componentsCreator = componentsCreator;
	}

	public generateMap(schema: Array<Array<number>>): Battlefield {
		this.createSchema(schema);
		return new Battlefield(this.mapProps);
	}

	private createSchema(schema: Array<Array<number>>): void {
		schema.forEach((row: Array<number>, rowIndex: number) => {
			return row.forEach((cell: number, cellIndex: number) => {
				const Component: TComponentConstructor = this._componentConstructors[cell];
				const point = new Point(cellIndex * this._cellSize, rowIndex * this._cellSize);
				if (Component !== null) {
					const component: IComponent = this._componentsCreator(new Component());
					component.position.set(point.x, point.y);
					if (component.name === EComponentName.ENEMY_TANK) {
						(component as EnemyTank).setDirection(ETankDirection.DOWN);
						this.addEmptyCell(point);
					}
					this.groupComponents(component);
				} else {
					this.addEmptyCell(point);
				}
			});
		});
	}

	private groupComponents(component: IComponent): void {
		switch (component.name) {
			case EComponentName.PLAYER_TANK:
				this._player = component as PlayerTank;
				break;
			case EComponentName.BASE:
				this._base = component as Base;
				break;
			case EComponentName.WATER:
				this._waterComponents.set(component.id, component as Water);
				break;
			case EComponentName.ENEMY_TANK:
				this._enemies.set(component.id, component as EnemyTank);
				break;
			case EComponentName.SIMPLE_BRICK:
			case EComponentName.INDESTRUCTIBLE_BRICK:
				this._walls.set(component.id, component as TBrick);
				break;
			case EComponentName.LEAVES:
				this._leaves.set(component.id, component as Leaf);
				break;
		}
	}

	private addEmptyCell(point: IPoint): void {
		this._emptyCells.push(point);
	}

	private get mapProps(): IMapProps {
		return {
			player: this._player,
			base: this._base,
			waterComponents: this._waterComponents,
			enemies: this._enemies,
			emptyCells: this._emptyCells,
			walls: this._walls,
			leaves: this._leaves,
		};
	}
}

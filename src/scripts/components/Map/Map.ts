import { IPoint } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";
import { IMapProps } from "../../interface/IMapProps";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";
import { Base } from "../Base/Base";
import { IndestructibleBrick } from "../Brick/IndestructibleBrick";
import { SimpleBrick } from "../Brick/SimpleBrick";
import { Leaf } from "../Leaf/Leaf";
import { EnemyTank } from "../Tank/EnemyTank";
import { PlayerTank } from "../Tank/PlayerTank";
import { Water } from "../Water/Water";

export class Map extends AbstractComponent implements IComponent {
	public name: string = EComponentType.MAP;
	public player: PlayerTank;
	public base: Base;
	public waterComponents: Array<Water>;
	public enemies: Array<EnemyTank>;
	public schema: Array<IComponent>;
	public emptyCells: Array<IPoint>;
	public walls: Array<SimpleBrick | IndestructibleBrick>;
	public leaves: Array<Leaf>;

	constructor(props: IMapProps) {
		super();
		this.player = props.player;
		this.base = props.base;
		this.waterComponents = props.waterComponents;
		this.enemies = props.enemies;
		this.schema = props.schema;
		this.emptyCells = props.emptyCells;
		this.walls = props.walls;
		this.leaves = props.leaves;
		this.drawComponents();
	}

	private drawComponents(): void {
		this.addChild(...this.walls, ...this.waterComponents, ...this.leaves, this.base, this.player);
	}
}

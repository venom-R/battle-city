import { IPoint } from "pixi.js";
import { EComponentName } from "../../enum/EComponentName";
import { IComponent } from "../../interface/IComponent";
import { IMapProps } from "../../interface/IMapProps";
import { TBrick } from "../../type/TBrick";
import { mapToArray } from "../../util/helpers";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";
import { Base } from "../Base/Base";
import { Leaf } from "../Leaf/Leaf";
import { EnemyTank } from "../Tank/EnemyTank";
import { PlayerTank } from "../Tank/PlayerTank";
import { Water } from "../Water/Water";

export class Battlefield extends AbstractComponent implements IComponent {
	public name: string = EComponentName.MAP;
	public player: PlayerTank;
	public base: Base;
	public waterComponents: Map<string, Water>;
	public enemies: Map<string, EnemyTank>;
	public schema: Map<string, IComponent>;
	public emptyCells: Array<IPoint>;
	public walls: Map<string, TBrick>;
	public leaves: Map<string, Leaf>;

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
		const walls: Array<TBrick> = mapToArray(this.walls);
		const waterComponents: Array<Water> = mapToArray(this.waterComponents);
		const leaves: Array<Leaf> = mapToArray(this.leaves);
		const enemies: Array<EnemyTank> = mapToArray(this.enemies);
		this.addChild(...walls, ...waterComponents, ...leaves, this.base, ...enemies, this.player);
	}
}

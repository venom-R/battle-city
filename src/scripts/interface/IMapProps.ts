import { IPoint } from "pixi.js";
import { Base } from "../components/Base/Base";
import { Leaf } from "../components/Leaf/Leaf";
import { EnemyTank } from "../components/Tank/EnemyTank";
import { PlayerTank } from "../components/Tank/PlayerTank";
import { Water } from "../components/Water/Water";
import { TBrick } from "../type/TBrick";

export interface IMapProps {
	player: PlayerTank;
	base: Base;
	waterComponents: Map<string, Water>;
	enemies: Map<string, EnemyTank>;
	emptyCells: Array<IPoint>;
	walls: Map<string, TBrick>;
	leaves: Map<string, Leaf>;
}

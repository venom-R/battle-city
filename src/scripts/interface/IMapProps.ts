import { IPoint } from "pixi.js";
import { Base } from "../components/Base/Base";
import { EnemyTank } from "../components/Tank/EnemyTank";
import { PlayerTank } from "../components/Tank/PlayerTank";
import { Water } from "../components/Water/Water";
import { IComponent } from "./IComponent";

export interface IMapProps {
	player: PlayerTank;
	base: Base;
	waterComponents: Array<Water>;
	enemies: Array<EnemyTank>;
	schema: Array<IComponent>;
	emptyCells: Array<IPoint>;
}

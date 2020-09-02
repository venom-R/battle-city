import { Base } from "../../components/Base/Base";
import { Map } from "../../components/Map/Map";
import { MapGenerator } from "../../components/Map/MapGenerator";
import { EnemyTank } from "../../components/Tank/EnemyTank";
import { PlayerTank } from "../../components/Tank/PlayerTank";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class GameState extends AbstractState implements IState {
	public mapGenerator = new MapGenerator(this.view.createComponent.bind(this.view));
	public playerTank: PlayerTank;
	public enemyTanks: Array<EnemyTank>;
	public base: Base;
	public map: Map;

	public onEnter(): void {
		this.generateComponents();
		this.scene.addChild(this.map);
		this.scene.visible = true;
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	public updateFrame(delta?: number): void {}

	private generateComponents(): void {
		this.map = this.mapGenerator.createMap(Map);
		this.playerTank = this.mapGenerator.playerTank;
		this.enemyTanks = this.mapGenerator.enemyTanks;
		this.base = this.mapGenerator.base;
		this.view.alignComponentCenterX(this.map);
		this.view.alignComponentCenterY(this.map);
	}
}

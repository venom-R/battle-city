import { Base } from "../../components/Base/Base";
import { Map } from "../../components/Map/Map";
import { MapGenerator } from "../../components/Map/MapGenerator";
import { EnemyTank } from "../../components/Tank/EnemyTank";
import { PlayerTank } from "../../components/Tank/PlayerTank";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class GameState extends AbstractState implements IState {
	public mapGenerator = new MapGenerator(this.view.createComponent.bind(this.view));
	public player: PlayerTank;
	public enemies: Array<EnemyTank>;
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

	public updateFrame(delta?: number): void {
		this.player.move();
		// this.enemyTanks.forEach((tank: EnemyTank) => tank.move());
	}

	private generateComponents(): void {
		this.map = this.mapGenerator.generate(Map);
		console.log(this.mapGenerator);
		this.player = this.map.player;
		this.enemies = this.map.enemies;
		this.base = this.map.base;
		this.view.alignComponentCenterX(this.map);
		this.view.alignComponentCenterY(this.map);
	}
}

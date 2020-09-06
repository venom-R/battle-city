import { Base } from "../../components/Base/Base";
import { Map } from "../../components/Map/Map";
import { MapGenerator } from "../../components/Map/MapGenerator";
import { EnemyTank } from "../../components/Tank/EnemyTank";
import { PlayerTank } from "../../components/Tank/PlayerTank";
import { IState } from "../../interface/IState";
import { TBrick } from "../../type/TBrick";
import { AbstractState } from "./AbstractState";

export class GameState extends AbstractState implements IState {
	public mapGenerator = new MapGenerator(this.view.createComponent.bind(this.view));
	public player: PlayerTank;
	public enemies: Array<EnemyTank>;
	public walls: Array<TBrick>;
	public base: Base;
	public map: Map;

	public onEnter(): void {
		this.generateComponents();
		this.player.velocity = this.model.playerVelocity;
		this.player.addControl();
		this.enemies.forEach((enemy: EnemyTank) => (enemy.velocity = this.model.enemyVelocity));
		this.scene.addChild(this.map);
		this.scene.visible = true;
	}

	public onLeave(): void {
		this.scene.visible = false;
		this.player.removeControl();
	}

	public updateFrame(delta?: number): void {
		this.walls.forEach((brick: TBrick) => {
			this.player.blockCollision(brick);
		});

		this.player.move();

		this.enemies.forEach((enemy: EnemyTank) => {
			this.player.blockCollision(enemy);
			// enemy.move()
		});
	}

	private generateComponents(): void {
		this.map = this.mapGenerator.generateMap(Map);
		this.player = this.map.player;
		this.enemies = this.map.enemies;
		this.base = this.map.base;
		this.walls = this.map.walls;
		this.view.alignComponentCenterX(this.map);
		this.view.alignComponentCenterY(this.map);
	}
}

import { IPoint } from "pixi.js";
import { Base } from "../../components/Base/Base";
import { AbstractBrick } from "../../components/Brick/AbstractBrick";
import { EnemyBullet } from "../../components/Bullet/EnemyBullet";
import { PlayerBullet } from "../../components/Bullet/PlayerBullet";
import { Battlefield } from "../../components/Map/Battlefield";
import { MapGenerator } from "../../components/Map/MapGenerator";
import { AbstractTank } from "../../components/Tank/AbstractTank";
import { EnemyTank } from "../../components/Tank/EnemyTank";
import { PlayerTank } from "../../components/Tank/PlayerTank";
import { EComponentName } from "../../enum/EComponentName";
import { EEventName } from "../../enum/EEventName";
import { EStateName } from "../../enum/EStateName";
import { IComponent, IMovingComponent } from "../../interface/IComponent";
import { IState } from "../../interface/IState";
import { TBrick } from "../../type/TBrick";
import { CollisionDetector } from "../../util/CollisionDetector";
import { isContain } from "../../util/helpers";
import { AbstractState } from "./AbstractState";

type TBullet = PlayerBullet | EnemyBullet;
type TTank = PlayerTank | EnemyTank;

export class GameState extends AbstractState implements IState {
	public mapGenerator = new MapGenerator(this.view.createComponent.bind(this.view));
	public player: PlayerTank;
	public enemies: Map<string, EnemyTank>;
	public walls: Map<string, TBrick>;
	public base: Base;
	public map: Battlefield;
	public bullets: Map<string, TBullet> = new Map();
	public tanks: Map<string, TTank>;

	public onEnter(): void {
		this.generateComponents();
		this.player.velocity = this.model.playerVelocity;
		this.enemies.forEach((enemy: EnemyTank) => (enemy.velocity = this.model.enemyVelocity));
		this.scene.addChild(this.map);
		this.scene.visible = true;
		this.registerEventListeners();
		// todo remove this
		this.enemies.forEach((tank) => {
			setInterval(() => {
				tank.fire();
			}, 3000);
		});
	}

	public onLeave(): void {
		this.scene.visible = false;
		this.unregisterEventListeners();
	}

	public updateFrame(delta: number): void {
		this.walls.forEach((brick: TBrick) => {
			this.tanks.forEach((tank: TTank) => {
				tank.preventCollision(brick);
			});

			this.bullets.forEach((bullet: TBullet) => {
				if (bullet.checkCollision(brick)) {
					brick.getDamage();
					bullet.break();
					if (brick.name === EComponentName.SIMPLE_BRICK) {
						this.walls.delete(brick.id);
					}
					this.bullets.delete(bullet.id);
				}
			});
		});

		this.tanks.forEach((tank: TTank) => {
			tank.move();
		});

		this.bullets.forEach((bullet: TBullet) => {
			bullet.move();

			this.tanks.forEach((tank: TTank) => {
				if (
					(bullet.name === EComponentName.ENEMY_BULLET && tank.name === EComponentName.PLAYER_TANK) ||
					(bullet.name === EComponentName.PLAYER_BULLET && tank.name === EComponentName.ENEMY_TANK)
				) {
					if (bullet.checkCollision(tank)) {
						tank.getDamage();
						bullet.break();
						this.bullets.delete(bullet.id);
					}
				}
			});

			if (bullet.checkCollision(this.base) && bullet.name === EComponentName.ENEMY_BULLET) {
				this.base.getDamage();
				bullet.break();
				this.bullets.delete(bullet.id);
			}
		});
	}

	private generateComponents(): void {
		this.map = this.mapGenerator.generateMap(Battlefield);
		this.player = this.map.player;
		this.enemies = this.map.enemies;
		this.tanks = new Map(this.enemies);
		this.tanks.set(this.player.id, this.player);
		this.base = this.map.base;
		this.walls = this.map.walls;
		this.view.alignComponentCenterX(this.map);
		this.view.alignComponentCenterY(this.map);

		console.log("walls", this.walls.size);
		console.log("tanks", this.tanks.size);
	}

	private registerEventListeners(): void {
		this.player.addControl();
		this.tanks.forEach((tank: TTank) => {
			tank.on(EEventName.TANK_FIRE, () => {
				this.drawBullet(tank);
			});
			tank.on(EEventName.TANK_DESTROYED, () => {
				this.tanks.delete(tank.id);
				if (tank.name === EComponentName.PLAYER_TANK) {
					this.model.emitter.emit(EEventName.GAME_OVER);
				} else {
					this.model.addKill();
				}
				if (this.tanks.size === 1 && !this.player.isDestroyed) {
					this.model.isWin = true;
					this.model.emitter.emit(EEventName.GAME_OVER);
				}
			});
		});
		this.base.on(EEventName.BASE_DESTROYED, () => {
			this.model.emitter.emit(EEventName.GAME_OVER);
		});
	}

	private unregisterEventListeners(): void {
		this.player.removeControl();
		this.tanks.forEach((tank: TTank) => {
			tank.off(EEventName.TANK_FIRE);
			tank.off(EEventName.TANK_DESTROYED);
		});
		this.base.off(EEventName.BASE_DESTROYED);
	}

	private drawBullet(tank: TTank): void {
		const bullet: TBullet =
			tank.name === EComponentName.PLAYER_TANK
				? this.view.createComponent(PlayerBullet)
				: this.view.createComponent(EnemyBullet);
		bullet.velocity = this.model.bulletVelocity;
		bullet.setInitialPoint(tank);
		bullet.setDirection(tank);
		this.map.addChild(bullet);
		this.bullets.set(bullet.id, bullet);
	}
}

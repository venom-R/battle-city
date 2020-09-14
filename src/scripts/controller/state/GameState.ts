import { Base } from "../../components/Base/Base";
import { EnemyBullet } from "../../components/Bullet/EnemyBullet";
import { PlayerBullet } from "../../components/Bullet/PlayerBullet";
import { Explosion } from "../../components/Explosion/Explosion";
import { Leaf } from "../../components/Leaf/Leaf";
import { Battlefield } from "../../components/Map/Battlefield";
import { MapGenerator } from "../../components/Map/MapGenerator";
import { EnemyTank } from "../../components/Tank/EnemyTank";
import { PlayerTank } from "../../components/Tank/PlayerTank";
import { Water } from "../../components/Water/Water";
import { EComponentName } from "../../enum/EComponentName";
import { EEventName } from "../../enum/EEventName";
import { IState } from "../../interface/IState";
import { TBrick } from "../../type/TBrick";
import { AbstractState } from "./AbstractState";

type TBullet = PlayerBullet | EnemyBullet;
type TTank = PlayerTank | EnemyTank;

export class GameState extends AbstractState implements IState {
	public mapGenerator = new MapGenerator(this.view.createComponent.bind(this.view));
	public player: PlayerTank;
	public enemies: Map<string, EnemyTank>;
	public waters: Map<string, Water>;
	public leaves: Map<string, Leaf>;
	public walls: Map<string, TBrick>;
	public base: Base;
	public map: Battlefield;
	public bullets: Map<string, TBullet> = new Map();
	public activeTanks: Map<string, TTank>;

	public onEnter(): void {
		this.createComponents();
		this.scene.addChild(this.map);
		this.registerEventListeners();
		this.scene.visible = true;
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
		// Moving tanks
		this.activeTanks.forEach((tank: TTank) => {
			tank.move(delta);
		});

		// Detecting collision with walls, including hitting by bullets
		this.walls.forEach((brick: TBrick) => {
			// Collision tank and wall
			this.activeTanks.forEach((tank: TTank) => {
				tank.preventCollision(brick);
			});

			// Hitting walls
			this.bullets.forEach((bullet: TBullet) => {
				if (this.bulletHit(bullet, brick) && brick.isDestroyed) {
					this.walls.delete(brick.id);
				}
			});
		});

		this.waters.forEach((water: Water) => {
			this.activeTanks.forEach((tank: TTank) => {
				if (tank.checkCollision(water)) {
					tank.break();
				}
			});
		});

		this.bullets.forEach((bullet: TBullet) => {
			bullet.move(delta);

			// Hitting tanks
			this.activeTanks.forEach((tank: TTank) => {
				if (!bullet.isFriendlyTarget(tank)) {
					this.bulletHit(bullet, tank);
				}
			});

			// Hitting a base
			if (!bullet.isFriendlyTarget(this.base)) {
				this.bulletHit(bullet, this.base);
			}
		});
	}

	private createComponents(): void {
		this.map = this.mapGenerator.generateMap(Battlefield);
		this.player = this.map.player;
		this.enemies = this.map.enemies;
		this.activeTanks = new Map(this.enemies);
		this.activeTanks.set(this.player.id, this.player);
		this.waters = this.map.waterComponents;
		this.leaves = this.map.leaves;
		this.base = this.map.base;
		this.walls = this.map.walls;
		this.player.velocity = this.model.playerVelocity;
		this.enemies.forEach((enemy: EnemyTank) => (enemy.velocity = this.model.enemyVelocity));
		this.view.alignComponentCenterX(this.map);
		this.view.alignComponentCenterY(this.map);
	}

	private registerEventListeners(): void {
		this.player.addControl();
		this.activeTanks.forEach((tank: TTank) => {
			tank.on(EEventName.TANK_FIRE, () => {
				this.drawBullet(tank);
			});
			tank.on(EEventName.TANK_DESTROYED, () => {
				this.activeTanks.delete(tank.id);
				if (tank.name === EComponentName.PLAYER_TANK) {
					this.model.emitter.emit(EEventName.GAME_OVER);
				} else {
					this.model.addKill();
				}
				if (this.activeTanks.size === 1 && !this.player.isDestroyed) {
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
		this.activeTanks.forEach((tank: TTank) => {
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
		bullet.setDirection(tank.directionAngle);
		this.map.addChild(bullet);
		this.bullets.set(bullet.id, bullet);
	}

	private bulletHit(bullet: TBullet, component: TBrick | TTank | Base): boolean {
		if (bullet.checkCollision(component)) {
			this.explode(bullet);
			component.getDamage();
			return true;
		}
		return false;
	}

	private explode(bullet: TBullet): void {
		const explosion = this.view.createComponent(Explosion);
		explosion.position.set(bullet.x, bullet.y);
		bullet.break();
		this.bullets.delete(bullet.id);
		this.map.addChild(explosion);
	}
}

import { IPoint } from "pixi.js";
import { Base } from "../../components/Base/Base";
import { BonusDegreaseSpeed } from "../../components/Bonus/BonusDegreaseSpeed";
import { BonusImmortal } from "../../components/Bonus/BonusImmortal";
import { BonusIncreaseSpeed } from "../../components/Bonus/BonusIncreaseSpeed";
import { BonusLife } from "../../components/Bonus/BonusLife";
import { EnemyBullet } from "../../components/Bullet/EnemyBullet";
import { PlayerBullet } from "../../components/Bullet/PlayerBullet";
import { Explosion } from "../../components/Explosion/Explosion";
import { Leaf } from "../../components/Leaf/Leaf";
import { Battlefield } from "../../components/Map/Battlefield";
import { MapGenerator } from "../../components/Map/MapGenerator";
import { levelSchema } from "../../components/Map/levelSchema";
import { TankAIControlledProxyCreator } from "../../components/Tank/controllers/TankAIControlledProxyCreator";
import { TankAIController } from "../../components/Tank/controllers/TankAIController";
import { EnemyTank } from "../../components/Tank/EnemyTank";
import { PlayerTank } from "../../components/Tank/PlayerTank";
import { TankKeyboardController } from "../../components/Tank/controllers/TankKeyboardController";
import { Water } from "../../components/Water/Water";
import { EComponentName } from "../../enum/EComponentName";
import { EEventName } from "../../enum/EEventName";
import { IBonus } from "../../interface/IBonus";
import { IState } from "../../interface/IState";
import { ITank } from "../../interface/ITank";
import { TBrick } from "../../type/TBrick";
import { randomItemInArray } from "../../util/helpers";
import { AbstractState } from "./AbstractState";

type TBullet = PlayerBullet | EnemyBullet;

const BONUSES: Array<new () => IBonus> = [BonusLife, BonusImmortal, BonusIncreaseSpeed, BonusDegreaseSpeed];

export class GameState extends AbstractState implements IState {
	public mapGenerator = new MapGenerator(levelSchema, this.view.createComponent.bind(this.view));
	public player: PlayerTank;
	public enemies: Map<string, EnemyTank>;
	public waters: Map<string, Water>;
	public leaves: Map<string, Leaf>;
	public walls: Map<string, TBrick>;
	public base: Base;
	public battlefield: Battlefield;
	public bullets: Map<string, TBullet> = new Map();
	public bonuses: Map<string, IBonus> = new Map();
	public activeTanks: Map<string, ITank>;
	public readonly bonusAppearanceInterval: number = 60 * 10;
	public bonusAppearanceTimer: number = 0;

	public onEnter(): void {
		this.createComponents();
		this.configureTanks();
		this.registerEventListeners();
		this.scene.addChild(this.battlefield);
		this.scene.visible = true;
	}

	public onLeave(): void {
		this.scene.visible = false;
		this.unregisterEventListeners();
	}

	public updateFrame(delta: number): void {
		this.addBonusesDuringTime(delta);

		// Moving tanks
		this.activeTanks.forEach((tank: ITank) => {
			tank.move(delta);
			tank.updateBonusTimers(delta);
			tank.preventCollision(this.base);

			// Detect and apply bonuses
			this.bonuses.forEach((bonus: IBonus) => {
				if (tank.hit(bonus)) {
					tank.applyBonus(bonus);
					this.model.soundManager.bonus();
					this.bonuses.delete(bonus.id);
				}
			});
		});

		// Detecting collision with walls, including hitting by bullets
		this.walls.forEach((brick: TBrick) => {
			// Collision tank and wall
			this.activeTanks.forEach((tank: ITank) => {
				if (tank.name === EComponentName.PLAYER_TANK && tank.hit(brick)) {
					this.model.soundManager.hit();
				}
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
			this.activeTanks.forEach((tank: ITank) => {
				if (tank.hit(water)) {
					tank.break();
				}
			});
		});

		this.bullets.forEach((bullet: TBullet) => {
			bullet.move(delta);

			// Hitting tanks
			this.activeTanks.forEach((tank: ITank) => {
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
		this.battlefield = this.mapGenerator.generateMap(Battlefield);
		this.player = this.battlefield.player;
		this.enemies = this.battlefield.enemies;
		this.waters = this.battlefield.waterComponents;
		this.leaves = this.battlefield.leaves;
		this.base = this.battlefield.base;
		this.walls = this.battlefield.walls;
		this.view.alignComponentCenterX(this.battlefield);
		this.view.alignComponentCenterY(this.battlefield);
	}

	private configureTanks(): void {
		this.player.velocity = this.model.playerVelocity;
		this.activeTanks = new Map();
		this.activeTanks.set(this.player.id, this.player);
		this.enemies.forEach((enemy: EnemyTank) => {
			const controlledEnemyCreator = new TankAIControlledProxyCreator(new TankAIController(enemy, this.base));
			const controlledEnemy: ITank = controlledEnemyCreator.create(enemy);
			controlledEnemy.velocity = this.model.enemyVelocity;
			this.activeTanks.set(controlledEnemy.id, controlledEnemy);
		});
	}

	private addBonusesDuringTime(delta: number): void {
		this.bonusAppearanceTimer += delta;
		if (this.bonusAppearanceTimer >= this.bonusAppearanceInterval) {
			this.bonusAppearanceTimer = 0;
			this.generateRandomBonus();
		}
	}

	private generateRandomBonus(): void {
		const Bonus: new () => IBonus = randomItemInArray(BONUSES);
		const bonus: IBonus = this.view.createComponent(new Bonus());
		const randomPosition: IPoint = randomItemInArray(this.battlefield.emptyCells);
		bonus.position.set(randomPosition.x, randomPosition.y);
		this.bonuses.set(bonus.id, bonus);
		this.battlefield.addChild(bonus);
	}

	private registerEventListeners(): void {
		this.player.addControl(new TankKeyboardController());
		this.activeTanks.forEach((tank: ITank) => {
			tank.on(EEventName.TANK_FIRE, () => {
				this.tankFireHandle(tank);
			});
			tank.on(EEventName.TANK_DESTROYED, () => {
				this.tankDestroyedHandle(tank);
			});
		});
		this.base.on(EEventName.BASE_DESTROYED, () => {
			this.model.emitter.emit(EEventName.GAME_OVER);
		});
	}

	private tankFireHandle(tank: ITank): void {
		this.drawBullet(tank);
		this.model.soundManager.shot();
	}

	private tankDestroyedHandle(tank: ITank): void {
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
	}

	private unregisterEventListeners(): void {
		this.player.removeControl();
		this.activeTanks.forEach((tank: ITank) => {
			tank.off(EEventName.TANK_FIRE);
			tank.off(EEventName.TANK_DESTROYED);
		});
		this.base.off(EEventName.BASE_DESTROYED);
	}

	private drawBullet(tank: ITank): void {
		const bullet: TBullet =
			tank.name === EComponentName.PLAYER_TANK
				? this.view.createComponent(new PlayerBullet())
				: this.view.createComponent(new EnemyBullet());
		bullet.velocity = this.model.bulletVelocity;
		bullet.setInitialPoint(tank);
		bullet.setDirection(tank.getDirectionAngle());
		this.battlefield.addChild(bullet);
		this.bullets.set(bullet.id, bullet);
	}

	private bulletHit(bullet: TBullet, component: TBrick | ITank | Base): boolean {
		if (bullet.hit(component)) {
			this.explode(bullet);
			component.getDamage();
			return true;
		}
		return false;
	}

	private explode(bullet: TBullet): void {
		const explosion = this.view.createComponent(new Explosion());
		explosion.position.set(bullet.x, bullet.y);
		bullet.break();
		this.bullets.delete(bullet.id);
		this.battlefield.addChild(explosion);
		this.model.soundManager.explode();
	}
}

import { flatten } from "lodash";
import { IndestructibleBrick } from "../../components/Brick/IndestructibleBrick";
import { SimpleBrick } from "../../components/Brick/SimpleBrick";
import { MapGenerator } from "../../components/Map/MapGenerator";
import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class GameState extends AbstractState implements IState {
	public mapGenerator = new MapGenerator(this.createComponent.bind(this));

	public onEnter(): void {
		const indestructibleBrick: IndestructibleBrick = this.createComponent(EComponentType.INDESTRUCTIBLE_BRICK);
		const simpleBrick: SimpleBrick = this.createComponent(EComponentType.SIMPLE_BRICK);
		simpleBrick.position.set(36, 0);
		this.scene.addChild(indestructibleBrick, simpleBrick);
		this.scene.position.set(18, 18);
		this.scene.visible = true;

		let map = flatten(this.mapGenerator.createSchema()).filter(Boolean);
		console.log(map);
		this.scene.addChild(...map);
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	public updateFrame(delta?: number): void {}
}

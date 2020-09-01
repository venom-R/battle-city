import { flatten } from "lodash";
import { MapGenerator } from "../../components/Map/MapGenerator";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class GameState extends AbstractState implements IState {
	public mapGenerator = new MapGenerator(this.view.createComponent.bind(this.view));

	public onEnter(): void {
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

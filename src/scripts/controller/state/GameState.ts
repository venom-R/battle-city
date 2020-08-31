import { IndestructibleBrick } from "../../components/Brick/IndestructibleBrick";
import { SimpleBrick } from "../../components/Brick/SimpleBrick";
import { EComponentType } from "../../enum/EComponentType";
import { ETextureName } from "../../enum/ETextureName";
import { IState } from "../../interface/IState";
import { AbstractState } from "./AbstractState";

export class GameState extends AbstractState implements IState {
	public onEnter(): void {
		console.log(this.view.textures);
		const indestructibleBrick: IndestructibleBrick = this.createComponent(EComponentType.INDESTRUCTIBLE_BRICK);
		const simpleBrick: SimpleBrick = this.createComponent(EComponentType.SIMPLE_BRICK);
		simpleBrick.position.set(36, 0);
		this.scene.addChild(indestructibleBrick, simpleBrick);
		this.scene.visible = true;
	}

	public onLeave(): void {
		this.scene.visible = false;
	}

	public updateFrame(delta?: number): void {}
}

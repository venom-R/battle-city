import { Container } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";
import { MapGenerator } from "./MapGenerator";

export class Map extends Container implements IComponent {
	public type: string = EComponentType.MAP;
	public generator: MapGenerator;

	constructor(generator: MapGenerator) {
		super();
		this.generator = generator;
		this.addChild(...generator.schema);
	}
}

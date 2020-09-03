import {EComponentType} from "../../enum/EComponentType";
import {IComponent} from "../../interface/IComponent";
import {AbstractComponent} from "../AbstractComponent/AbstractComponent";
import {MapGenerator} from "./MapGenerator";

export class Map extends AbstractComponent implements IComponent {
	public type: string = EComponentType.MAP;
	public generator: MapGenerator;

	constructor(generator: MapGenerator) {
		super();
		this.generator = generator;
		this.addChild(...generator.schema);
	}
}

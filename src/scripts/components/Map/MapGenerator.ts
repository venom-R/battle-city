import { Container } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { initialSchema } from "./initialSchema";

const componentsType: Array<string> = [
	"EMPTY",
	EComponentType.SIMPLE_BRICK,
	EComponentType.INDESTRUCTIBLE_BRICK,
	EComponentType.WATER,
	EComponentType.LEAVES,
	EComponentType.BASE,
	EComponentType.PLAYER_TANK,
];

export class MapGenerator {
	private readonly _cellSize: number = 36;
	private readonly _initialSchema: Array<Array<number>> = initialSchema;
	private readonly _componentsType: Array<string> = componentsType;
	private _componentsCreator: Function;

	constructor(componentsCreator: Function) {
		this._componentsCreator = componentsCreator;
	}

	public createSchema() {
		return this._initialSchema.map((row: Array<number>, rowIndex: number) => {
			return row.map((cell: number, cellIndex: number) => {
				const componentType: string = this._componentsType[cell];
				// TODO when all components will be available change this condition
				if (componentType !== "EMPTY") {
					const component: Container = this._componentsCreator(componentType);
					component.position.set(cellIndex * this._cellSize, rowIndex * this._cellSize);
					return component;
				}
				return 0;
			});
		});
	}
}

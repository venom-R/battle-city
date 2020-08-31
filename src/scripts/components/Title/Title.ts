import { Text, TextStyle } from "pixi.js";
import { EComponentType } from "../../enum/EComponentType";
import { IComponent } from "../../interface/IComponent";

const style = new TextStyle({
	fontFamily: "sans-serif",
	fontSize: 72,
	fontWeight: "bold",
	fill: "#fff",
	align: "center",
});

export class Title extends Text implements IComponent {
	public type: string = EComponentType.TITLE;

	constructor(text: string) {
		super(text, style);
	}
}

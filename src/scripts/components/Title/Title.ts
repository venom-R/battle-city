import { Text, TextStyle } from "pixi.js";

const style = new TextStyle({
	fontFamily: "sans-serif",
	fontSize: 72,
	fontWeight: "bold",
	fill: "#fff",
	align: "center",
});

export class Title extends Text {
	constructor(text: string) {
		super(text, style);
	}
}

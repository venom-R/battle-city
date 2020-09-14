import { TextStyle } from "pixi.js";
import { EComponentName } from "../../enum/EComponentName";
import { IComponent } from "../../interface/IComponent";
import { AbstractText } from "./AbstractText";
import { commonStyles } from "./commonStyles";

const style = new TextStyle({
	...commonStyles,
	fontSize: 72,
	fontWeight: "bold",
	align: "center",
});

export class Title extends AbstractText implements IComponent {
	public name: string = EComponentName.TITLE;
	public _content: string;

	constructor(content: string) {
		super(content, style);
	}
}

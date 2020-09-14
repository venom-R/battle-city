import { TextStyle } from "pixi.js";
import { EComponentName } from "../../enum/EComponentName";
import { IComponent } from "../../interface/IComponent";
import { AbstractText } from "./AbstractText";
import { commonStyles } from "./commonStyles";

const style = new TextStyle({
	...commonStyles,
	fontSize: 30,
});

export class Paragraph extends AbstractText implements IComponent {
	public name: string = EComponentName.PARAGRAPH;
	public _content: string;

	constructor(content: string) {
		super(content, style);
	}
}

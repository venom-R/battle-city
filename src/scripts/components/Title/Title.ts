import {Text, TextStyle} from "pixi.js";
import {EComponentType} from "../../enum/EComponentType";
import {IComponent} from "../../interface/IComponent";
import {AbstractComponent} from "../AbstractComponent/AbstractComponent";

const style = new TextStyle({
	fontFamily: "sans-serif",
	fontSize: 72,
	fontWeight: "bold",
	fill: "#fff",
	align: "center",
});

export class Title extends AbstractComponent implements IComponent {
	public type: string = EComponentType.TITLE;
	public _content: string;
	private _text;

	constructor(content: string) {
		super();
		this._content = content;
		this._text = new Text(content, style);
		this.addChild(this._text);
	}
}

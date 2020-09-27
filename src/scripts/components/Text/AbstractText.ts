import { Text, TextStyle } from "pixi.js";
import { IComponent } from "../../interface/IComponent";
import { AbstractComponent } from "../AbstractComponent/AbstractComponent";

export abstract class AbstractText extends AbstractComponent implements IComponent {
	public _content: string;
	protected _text;//type

	constructor(content: string, style: TextStyle) {
		super();
		this._content = content;
		this._text = new Text(content, style);
		this.addChild(this._text);
	}
}

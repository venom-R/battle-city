import { Application } from "pixi.js";
import "../styles/index.scss";

const APP_CONFIG = {
	width: 1024,
	height: 768,
	antialiasing: true,
	transparent: false,
	resolution: 1,
};

const stageElement: HTMLElement = document.getElementById("stage");
const app = new Application(APP_CONFIG);
stageElement.appendChild(app.view);

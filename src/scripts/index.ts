import { GameController } from "./controller/GameController";
import { GameModel } from "./model/GameModel";
import { GameView } from "./view/GameView";
import "../styles/index.scss";

function initGame(): void {
	const model = new GameModel();
	const view = new GameView();
	new GameController(model, view);
}

document.addEventListener("DOMContentLoaded", initGame);

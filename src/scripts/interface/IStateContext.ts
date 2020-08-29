import { GameModel } from "../model/GameModel";
import { GameView } from "../view/GameView";

export interface IStateContext {
	model: GameModel;
	view: GameView;
}

import { IState } from "../interface/IState";

interface IStatesCollection {
	[name: string]: IState;
}

type TOptions = {
	states?: IStatesCollection;
	currentState?: IState;
};

export class StateMachine {
	private _states: IStatesCollection;
	private _currentState: IState = null;

	public initialize(options: TOptions = {}): void {
		if (options.states) {
			this._states = options.states;
		}

		if (options.currentState) {
			this._currentState = options.currentState;
		}
	}

	public get states(): IStatesCollection {
		return this._states;
	}

	public get currentState(): IState {
		return this._currentState;
	}

	public addState(name: string, stateInstance: IState): void {
		this._states[name] = stateInstance;
	}

	public transition(nextStateName: string): void {
		if (this._currentState) {
			this._currentState.onLeave();
		}
		this._currentState = this.states[nextStateName];
		this._currentState.onEnter();
	}
}

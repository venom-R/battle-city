import { Dictionary, has } from "lodash";
import { LoaderResource } from "pixi.js";
import { ISound } from "../interface/ISound";

export class SoundManager implements ISound {
	private readonly _resources: Partial<Dictionary<LoaderResource>>;

	constructor(resources: Partial<Dictionary<LoaderResource>>) {
		this._resources = resources;
	}

	public play(resourceName: string): void {
		if (has(this._resources, resourceName)) {
			this._resources[resourceName].sound.play();
		} else {
			console.error(`${resourceName} is not found.`);
		}
	}
}

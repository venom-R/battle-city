import { Dictionary, has } from "lodash";
import { LoaderResource } from "pixi.js";

export class SoundManager {
	private readonly _resources: Partial<Dictionary<LoaderResource>>;
	public isMute: boolean = false;

	constructor(resources: Partial<Dictionary<LoaderResource>>) {
		this._resources = resources;
	}

	public play(resourceName: string): void {
		if (this.isMute) {
			return;
		}
		if (has(this._resources, resourceName)) {
			this._resources[resourceName].sound.play();
		} else {
			console.error(`${resourceName} is not found.`);
		}
	}
}

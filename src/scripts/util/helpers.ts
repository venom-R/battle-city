import { includes, random } from "lodash";
import { IComponent, IMovingComponent } from "../interface/IComponent";
import { TWorkingArea } from "../type/TWorkingArea";

export function randomItemInArray<T>(array: Array<T>): T {
	return array[random(0, array.length - 1)];
}

export function randomUniqItemsInArray<T>(array: Array<T>, length: number): Array<T> {
	if (array.length < length) {
		throw new Error("randomUniqItemsInArray() -> parameter length bigger than array.length");
	}
	let indexes: Array<number> = [];
	while (indexes.length < length) {
		const randomIndex: number = random(0, array.length - 1);
		if (!includes(indexes, randomIndex)) {
			indexes.push(randomIndex);
		}
	}
	return array.filter((_item: T, index: number) => {
		return includes(indexes, index);
	});
}

export function isContain(component: IComponent, container: TWorkingArea): boolean {
	return (
		component.x >= container.x &&
		component.y >= container.y &&
		component.x <= container.height &&
		component.y <= container.width
	);
}

export function mapToArray<T>(collection: Map<string, T>): Array<T> {
	return Array.from(collection.values());
}

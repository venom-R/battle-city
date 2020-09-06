export function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItemInArray(array: Array<any>): any {
	return array[randomInt(0, array.length - 1)];
}

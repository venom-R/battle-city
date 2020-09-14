export interface ISound {
	hit(): void;
	bonus(): void;
	shot(): void;
	win(): void;
	lose(): void;
	explode(): void;
}

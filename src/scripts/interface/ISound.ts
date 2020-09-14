export interface ISound {
	isMute: boolean;
	hit(): void;
	bonus(): void;
	shot(): void;
	win(): void;
	lose(): void;
	explode(): void;
}

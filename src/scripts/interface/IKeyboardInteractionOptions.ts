export interface IKeyboardInteractionOptions {
	key: string;
	onPress?(e: KeyboardEvent): void;
	onRelease?(e: KeyboardEvent): void;
}

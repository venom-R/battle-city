import { EComponentType } from "../enum/EComponentType";
import { ETextureName } from "../enum/ETextureName";
import { IndestructibleBrick } from "./Brick/IndestructibleBrick";
import { SimpleBrick } from "./Brick/SimpleBrick";
import { Button } from "./Button/Button";
import { LoadingBar } from "./LoadingBar/LoadingBar";
import { Title } from "./Title/Title";

export function componentsFactory(getTexture: Function, context?: any): Function {
	const texture = context ? getTexture.bind(context) : getTexture;
	return (type: string, ...rest: any) => {
		switch (type) {
			case EComponentType.LOADING_BAR:
				return new LoadingBar();
			case EComponentType.START_BUTTON:
				const startButton = new Button(texture(ETextureName.START_BUTTON));
				startButton.type = EComponentType.START_BUTTON;
				return startButton;
			case EComponentType.TITLE:
				const text: string = rest[0];
				return new Title(text);
			case EComponentType.INDESTRUCTIBLE_BRICK:
				return new IndestructibleBrick(texture(ETextureName.INDESTRUCTIBLE_BRICK));
			case EComponentType.SIMPLE_BRICK:
				return new SimpleBrick([
					texture(ETextureName.SMALL_BRICK_1),
					texture(ETextureName.SMALL_BRICK_2),
					texture(ETextureName.SMALL_BRICK_3),
					texture(ETextureName.SMALL_BRICK_4),
				]);
		}
	};
}

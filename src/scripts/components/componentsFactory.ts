import { EComponentType } from "../enum/EComponentType";
import { ETextureName } from "../enum/ETextureName";
import { Base } from "./Base/Base";
import { IndestructibleBrick } from "./Brick/IndestructibleBrick";
import { SimpleBrick } from "./Brick/SimpleBrick";
import { StartButton } from "./Button/StartButton";
import { Leaf } from "./Leaf/Leaf";
import { LoadingBar } from "./LoadingBar/LoadingBar";
import { PlayerTank } from "./Tank/PlayerTank";
import { Title } from "./Title/Title";
import { Water } from "./Water/Water";

export function componentsFactory(getTexture: Function, context?: any): Function {
	const texture = context ? getTexture.bind(context) : getTexture;
	return (type: string, ...rest: any) => {
		switch (type) {
			case EComponentType.LOADING_BAR:
				return new LoadingBar();
			case EComponentType.START_BUTTON:
				return new StartButton(texture(ETextureName.START_BUTTON));
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
			case EComponentType.PLAYER_TANK:
				return new PlayerTank(texture(ETextureName.PLAYER_TANK));
			case EComponentType.BASE:
				return new Base(texture(ETextureName.BASE));
			case EComponentType.LEAVES:
				return new Leaf(texture(ETextureName.LEAVES));
			case EComponentType.WATER:
				return new Water(texture(ETextureName.WATER));
		}
	};
}

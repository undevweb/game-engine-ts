import {PositionItf} from "../../Core/PositionItf";
import {SpriteItf} from "./SpriteItf";

export abstract class SpriteService {
    public static cutSpritesHorizontal(
        nbSprites: number,
        width: number,
        height: number,
        position: PositionItf = {
            x: 0,
            y: 0
        }
    ): SpriteItf[] {
        const sprites: SpriteItf[] = [];
        for (let scale = 0; scale < nbSprites; scale++) {
            sprites.push({
                x: position.x + width * scale,
                y: position.y,
                width,
                height
            })
        }
        return sprites;
    }

    public static cutSpritesVertical(
        nbSprites: number,
        width: number,
        height: number,
        position: PositionItf = {
            x: 0,
            y: 0
        }
    ): SpriteItf[] {

        const sprites: SpriteItf[] = [];
        for (let scale = 0; scale < nbSprites; scale++) {
            sprites.push({
                x: position.x,
                y: position.y + height * scale,
                width,
                height
            })
        }
        return sprites;
    }
}

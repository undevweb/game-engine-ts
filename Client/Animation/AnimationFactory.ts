import {AnimationEnum} from "./AnimationEnum";
import {RectangleAnimation} from "./RectangleAnimation";
import {SpriteAnimation} from "./SpriteAnimation";
import {SpriteService} from "../Sprite/SpriteService";

export abstract class AnimationFactory {


    static factory: any = {
        [AnimationEnum.RECTANGLE]: (options: any) => AnimationFactory.generateRectangle(options),
        [AnimationEnum.SPRITE]: (options: any) => AnimationFactory.generateSprite(options)
    }

    static generate(animationEnum: AnimationEnum, options: any) {
        return AnimationFactory.factory[animationEnum](options);
    }

    static generateRectangle(options:any){
        return new RectangleAnimation(options.width,options.height,options);
    }

    static generateSprite(options: any) {
        return new SpriteAnimation(
            options.width,
            options.height,
            options.img,
            options.sprites.s === 'h' ? SpriteService.cutSpritesHorizontal(
                options.sprites.nbSprites,
                options.sprites.width,
                options.sprites.height,
                {x: options.sprites.x, y: options.sprites.y},
            ) : SpriteService.cutSpritesVertical(
                options.sprites.nbSprites,
                options.sprites.width,
                options.sprites.height,
                {x: options.sprites.x, y: options.sprites.y}
            ),
            options.timePerSprite
        )
    }
}

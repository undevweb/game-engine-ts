import {AnimationItf} from "./AnimationItf";
import {SpriteItf} from "../Sprite/SpriteItf";
import {DateService} from "../../Core/Service/DateService";
import {Canvas} from "../Canvas";
import {PositionItf} from "../../Core/PositionItf";

export class SpriteAnimation implements AnimationItf {

    img: any;
    width: number;
    height: number;
    dateStartAnimation: number;
    timePerSprite: number;//in milliseconds
    sprites: SpriteItf[];

    constructor(width: number, height: number, img: any, sprites: SpriteItf[], timePerSprite: number = 100) {
        this.sprites = sprites;
        this.timePerSprite = timePerSprite;
        this.width = width;
        this.height = height;
        this.img = img;
        this.dateStartAnimation = DateService.now();
    }


    draw(canvas: Canvas, position: PositionItf) {

        // duration from start /
        const indexSprite = Math.floor((DateService.now() - this.dateStartAnimation) / this.timePerSprite) % (this.sprites.length);

        canvas.ctx.drawImage(this.img,
            //source
            this.sprites[indexSprite].x,
            this.sprites[indexSprite].y,
            this.sprites[indexSprite].width,
            this.sprites[indexSprite].height,
            //destination
            canvas.getBorderSize() + ((position.x) * canvas.getWidth()) - (this.width * canvas.getWidth()) / 2,
            canvas.getBorderSize() + ((position.y) * canvas.getHeight()) - this.height * canvas.getHeight() / 2,
            this.width * canvas.getWidth(),
            this.height * canvas.getHeight()
        );
        return this;
    }
}

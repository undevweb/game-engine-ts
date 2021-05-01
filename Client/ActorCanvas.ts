/**
 * Any element present on the map
 */
import {Actor} from "../Core/Actor";
import {AnimationItf} from "./Animation/AnimationItf";
import {Canvas} from "./Canvas";
import {Position} from "../Core/Position";
import {AnimationFactory} from "./Animation/AnimationFactory";
import {DateService} from "../Core/Service/DateService";

export class ActorCanvas extends Actor {

    animations: { [state: string]: AnimationItf };
    canvas: Canvas | null;

    constructor(position: Position, options: any) {
        super(position);
        // this.animation = {'default': new RectangleAnimation(0.125, 0.22222222222)};

        this.animations = {
            'default': AnimationFactory.generate(
                options.animations['default'].animation,
                options.animations['default'].options
            )
        };
        this.canvas = null;
    }

    animate(timestampStartMove: number = DateService.now()) {
        super.animate(timestampStartMove);
        if (this.canvas != null) {
            this.draw(this.canvas);
        }
    }

    changeCanvas(canvas: Canvas | null) {
        this.canvas = canvas;
    }

    draw(canvas: Canvas) {
        this.animations[this.state].draw(canvas, this.position);
    }

}

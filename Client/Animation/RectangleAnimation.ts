import {AnimationItf} from "./AnimationItf";
import {Canvas} from "../Canvas";
import {PositionItf} from "../../Core/PositionItf";

export class RectangleAnimation implements AnimationItf {
    width: number;
    height: number;
    backgroundColor: string;
    borderColor: string;
    borderSize: number;

    constructor(width: number, height: number, options: any = {}) {
        this.width = width;
        this.height = height;
        this.borderColor = options.borderColor ?? null;
        this.backgroundColor = options.backgroundColor ?? null;
        this.borderSize = options.borderSize;
    }

    draw(canvas: Canvas, position: PositionItf) {

        canvas.ctx.fillStyle = this.backgroundColor;
        canvas.ctx.fillRect(
            canvas.getBorderSize() + ((position.x) * canvas.getWidth() - (this.width * canvas.getWidth()) / 2),
            canvas.getBorderSize() + ((position.y) * canvas.getHeight() - (this.height * canvas.getHeight()) / 2),
            this.width * canvas.getWidth(),
            this.height * canvas.getHeight()
        );

        if (this.borderSize > 0) {
            canvas.ctx.strokeStyle = this.borderColor;
            canvas.ctx.lineWidth = this.borderSize;
            canvas.ctx.strokeRect(
                canvas.getBorderSize() + ((position.x) * canvas.getWidth() - (this.width * canvas.getWidth()) / 2),
                canvas.getBorderSize() + ((position.y) * canvas.getHeight() - (this.height * canvas.getHeight()) / 2),
                this.width * canvas.getWidth(),
                this.height * canvas.getHeight()
            );
        }

        return this;
    }
}

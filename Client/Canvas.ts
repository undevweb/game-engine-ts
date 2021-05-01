import {CanvasOptionsItf} from "./CanvasOptionsItf";
import {PositionItf} from "../Core/PositionItf";

export class Canvas {
    ctx: CanvasRenderingContext2D;
    options: CanvasOptionsItf;

    constructor(ctx: CanvasRenderingContext2D, options: CanvasOptionsItf) {
        this.ctx = ctx;
        this.options = options;
        this.ctx.canvas.width = this.options.width + (this.options.borderSize * 2); //2 because left and right
        this.ctx.canvas.height = this.options.height + (this.options.borderSize * 2);

        this.ctx.canvas.onselectstart = () => false;//prevent double-click
        this.drawCadre();
        if (options.debugMode) {
            this.drawGrid();
        }
        // this.ctx.canvas.style.border = `${this.options.borderSize}px ${this.options.borderBold} ${this.options.borderColor}`;
    }

    getWidth(): number {
        return this.options.width;
    }

    getHeight(): number {
        return this.options.height;
    }

    getBorderSize(): number {
        return this.options.borderSize;
    }

    /**
     * With the border the origin is not always at 0,0
     */
    getOrigin(): PositionItf {
        return {x: this.options.borderSize, y: this.options.borderSize}
    }


    drawCadre() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.options.borderSize;
        this.ctx.strokeStyle = "#000";
        this.ctx.rect(
            this.options.borderSize / 2,
            this.options.borderSize / 2,
            this.options.width + this.options.borderSize,
            this.options.height + this.options.borderSize
        );
        this.ctx.stroke();
        return this;
    };

    /**
     * Draw the grid of the map
     */
    drawGrid() {
        const stepDict = {
            0: {
                stepWidth: 0.05 * this.getWidth(),
                stepHeight: 0.05* this.getHeight(),
                color: "#eaecef",
                lineWidth: 1
            },
            1: {
                // Verify it's a multiple of little step (index 0)
                stepWidth: 0.25 * this.getWidth(),
                stepHeight: 0.25 * this.getHeight(),
                color: "#ff0000",
                lineWidth: 1
            }
        }

        // Vertical lines
        for (let x = this.options.borderSize + stepDict[0].stepWidth; x < (this.options.borderSize + this.options.width); x += stepDict[0].stepWidth) {
            const step = (x - this.options.borderSize) % stepDict[1].stepWidth === 0 ? 1 : 0;
            this.drawLine(
                {x, y: this.options.borderSize},
                {x, y: this.options.height + this.options.borderSize},
                stepDict[step].lineWidth, stepDict[step].color
            );
        }

        // Horizontal lines
        for (let y = this.options.borderSize + stepDict[0].stepHeight; y < (this.options.borderSize + this.options.height); y += stepDict[0].stepHeight) {
            const step = (y - this.options.borderSize) % stepDict[1].stepHeight === 0 ? 1 : 0;
            this.drawLine(
                {x: this.options.borderSize, y},
                {x: this.options.width + this.options.borderSize, y},
                stepDict[step].lineWidth, stepDict[step].color
            );
        }

        return this;
    };

    /**
     * Draw the grid of the map
     */
    drawGridPixels() {
        const stepDict = {
            0: {
                step: 10,
                color: "#eaecef",
                lineWidth: 1
            },
            1: {
                step: 50,
                color: "#ff0000",
                lineWidth: 1
            }
        }

        // Vertical lines
        for (let x = this.options.borderSize + stepDict[0].step; x < (this.options.borderSize + this.options.width); x += stepDict[0].step) {
            const step = (x - this.options.borderSize) % stepDict[1].step === 0 ? 1 : 0;
            this.drawLine(
                {x, y: this.options.borderSize},
                {x, y: this.options.height + this.options.borderSize},
                stepDict[step].lineWidth, stepDict[step].color
            );
        }

        // Horizontal lines
        for (let y = this.options.borderSize + stepDict[0].step; y < (this.options.borderSize + this.options.height); y += stepDict[0].step) {
            const step = (y - this.options.borderSize) % stepDict[1].step === 0 ? 1 : 0;
            this.drawLine(
                {x: this.options.borderSize, y},
                {x: this.options.width + this.options.borderSize, y},
                stepDict[step].lineWidth, stepDict[step].color
            );
        }

        return this;
    };

    drawLine(from: PositionItf, to: PositionItf, lineWidth: number, color: string) {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth / 2;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    clear() {
        this.ctx.clearRect(this.getOrigin().x, this.getOrigin().y, this.getWidth(), this.getHeight());
        if(this.options.debugMode){
            this.drawGrid();
        }
    }

    // /**
    //  * Set the dimensions of the canvas
    //  * @param width
    //  * @param height
    //  */
    // setDimensions(width: number, height: number) {
    //     this.ctx.canvas.width = width;
    //     this.ctx.canvas.height = height;
    // }
    //
    // relMouseCoords(event: any): Position {
    //     const rect = this.ctx.canvas.getBoundingClientRect();
    //     return new Position(
    //         (event.clientX - rect.left) / (rect.right - rect.left), //* this.ctx.canvas.width),
    //         (event.clientY - rect.top) / (rect.bottom - rect.top)//* this.ctx.canvas.height)
    //     );
    // }
    //
    // addEventListener(event: EventName, callback: any) {
    //     this.ctx.canvas.addEventListener("click", callback);
    // }
    //
    //
    //
    //
    //
    // drawRectange(rectangle: RectangleClient) {
    //     this.ctx.fillStyle = rectangle.backgroundColor;
    //     this.ctx.fillRect(
    //         (rectangle.position.x - rectangle.width / 2) * this.options.width + this.options.borderSize,
    //         (rectangle.position.y - rectangle.height / 2) * this.options.height + this.options.borderSize,
    //         rectangle.width * this.options.width,
    //         rectangle.height * this.options.height
    //     );
    // }
}

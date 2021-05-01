import {GameEngine} from "../Core/GameEngine";
import {Canvas} from "./Canvas";
import {CanvasOptionsItf} from "./CanvasOptionsItf";
import {GameStateEnum} from "../Core/GameStateEnum";
import {ActorCanvas} from "./ActorCanvas";

export class GameEngineCanvas extends GameEngine {
    /**
     * Définition
     */
    rate: number;

    divCanvas: string | null = null;
    canvas: Canvas | null = null;

    static defaultOptions: CanvasOptionsItf = {
        rate: (16 / 9),
        ratePerSecond: 30,
        debugMode: false,
        width: 800,
        height: 800,
        borderSize: 2,
        borderColor: "#000",
        borderBold: "solid"
    };

    /**
     *
     *  @param divCanvas ('game-canvas' for example, don't put the #)
     * @param options
     */
    constructor(divCanvas: string, options: CanvasOptionsItf = GameEngineCanvas.defaultOptions) {
        super();
        this.rate = options.rate;
        this.ratePerSecond = options.ratePerSecond;
        this.setCanvas(divCanvas, options);
    }

    animate() {
        if (this.canvas !== null && this.state === GameStateEnum.PLAYING) {
            this.canvas.clear();
            this.actors.forEach(a => {
                a.animate();
            });
            setTimeout(() => this.animate(), 1000 / this.ratePerSecond);
        }
    }

    addActor(actor: ActorCanvas) {
        actor.changeCanvas(this.canvas);
        super.addActor(actor);
    }

    setCanvas(divCanvas: string, options: CanvasOptionsItf = GameEngineCanvas.defaultOptions) {
        this.divCanvas = divCanvas;
        const canvasHtml = <HTMLCanvasElement>document.getElementById(divCanvas);
        const ctx = canvasHtml.getContext('2d')

        if (ctx === null) {
            throw Error(`The context of canvas ${divCanvas} can't be created`);
        }
        this.canvas = new Canvas(ctx, options);
    }

}

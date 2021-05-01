import {Actor} from "./Actor";
import {GameStateEnum} from "./GameStateEnum";
import {Generator} from "./Generator";
import {DateService} from "./Service/DateService";

export class GameEngine {

    id: string;
    actors: Actor[];
    timeStart:number;
    state:GameStateEnum;
    ratePerSecond : number;

    constructor() {
        this.id = Generator.genId();
        this.actors = [];
        this.timeStart = 0;
        this.state = GameStateEnum.STOP;
        this.ratePerSecond = 30;
    }

    addActor(actor: Actor) {
        this.actors.push(actor);
    }

    start() {
        this.timeStart = DateService.now();
        this.state = GameStateEnum.PLAYING;
        this.animate();
    }

    animate() {
        if (this.state === GameStateEnum.PLAYING) {
            this.actors.forEach(a => {
                a.animate();
            });
            setTimeout(() => this.animate(), 1000 / this.ratePerSecond);
        }
    }

}

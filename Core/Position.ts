import {PositionItf} from "./PositionItf";

export class Position {

    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    change(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Return true if a position is equal of this
     * @param position
     */
    equal(position : PositionItf){
        return this.x === position.x && this.y === position.y;
    }
}

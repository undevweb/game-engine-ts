import {HitboxItf} from "./HitboxItf";

export class Rectangle implements HitboxItf {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

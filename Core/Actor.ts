/**
 * Any element present on the map
 */
import {Position} from "./Position";
import {HitboxItf} from "./Hitbox/HitboxItf";
import {Generator} from "./Generator";
import {Rectangle} from "./Hitbox/Rectangle";
import {DateService} from "./Service/DateService";
import {CalcService} from "./Service/CalcService";

export class Actor {

    id: string;
    name: string;
    position: Position;

    destination: Position | null;
    positionStartMove: Position | null;
    timestampStartMove: number | null = null;

    hitbox: HitboxItf;
    state: string;
    speed: number;

    constructor(position: Position) {
        this.id = Generator.genId();
        this.name = '';
        this.position = position;
        this.destination = null;
        this.positionStartMove = null;
        this.hitbox = new Rectangle(0.12, 0.0675);
        this.state = 'default';
        /**
         * Point of percent by millisecond
         */
        this.speed = 0.1 / 1000;
    }

    animate(timestampStartMove: number = DateService.now()) {
        this.move(this.nextPositionAt(timestampStartMove));

        // if speed > 0 move the actor
    }

    moveTo(destination: Position, timestampStartMove: number = DateService.now()): Actor {
        this.timestampStartMove = timestampStartMove;
        this.positionStartMove = this.position;
        this.destination = destination;
        return this;
    }

    move(position: Position): Actor {
        this.position = position;

        if (this.destination !== null && this.position.equal(this.destination)) {
            this.destination = null;
            this.timestampStartMove = null;
        }

        return this;
    }

    /**
     * Calc the next position for a timestamp given
     * @param timestamp
     */
    nextPositionAt(timestamp: number = DateService.now()): Position {

        //If there is no destination in progress or if the timestamp is under the time it was decided to move
        //we return the curent position
        if (this.timestampStartMove === null || this.destination === null
            || this.positionStartMove === null || timestamp < this.timestampStartMove
        ) {
            return this.position;
        }

        const tpsFromStartMove = timestamp - this.timestampStartMove;
        const angle = CalcService.angleBetweenOriginAndDestination(this.positionStartMove, this.destination);

        const newPosition = CalcService.newPosition(tpsFromStartMove, this.speed, this.positionStartMove, angle);
        // newPosition.x = Math.round(newPosition.x * 1000) / 1000;
        // newPosition.y = Math.round(newPosition.y * 1000) / 1000;

        // If the new position is further than the destination, return the destination
        if (CalcService.distanceBetweenPositions(this.positionStartMove, newPosition) > CalcService.distanceBetweenPositions(this.positionStartMove, this.destination)) {
            return this.destination;
        }

        return newPosition;
    }

}

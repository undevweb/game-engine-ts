import {PositionItf} from "../PositionItf";
import {Position} from "../Position";

export abstract class CalcService {

    /**
     * Return the distance between the position A and the the position B
     * @param positionA
     * @param positionB
     * @return number
     */
    public static distanceBetweenPositions(positionA: PositionItf, positionB: PositionItf): number {
        return Math.sqrt(((positionB.x - positionA.x) * (positionB.x - positionA.x) + (positionB.y - positionA.y) * (positionB.y - positionA.y)));
    };

    /**
     *
     * @param origin
     * @param destination
     * @return number
     */
    public static angleBetweenOriginAndDestination(origin: PositionItf, destination: PositionItf): number {
        let x = destination.x - origin.x;
        const y = destination.y - origin.y;
        if (x == 0) {
            return y > 0 ? Math.PI / 2 : -Math.PI / 2;
        }
        return (x < 0) ? (Math.atan(y / x) + Math.PI) : (Math.atan(y / x));
    };

    public static newPosition(time: number, speed: number, origin: Position, angle: number): Position {
        return new Position(
            origin.x + speed * Math.cos(angle) * time,
            origin.y + speed * Math.sin(angle) * time
        );
        // return new Position(
        //     origin.x + speed + Math.cos(angle),
        //     origin.y + speed + Math.sin(angle)
        // );
    };


    /**
     * Return true if a position is in collision with a rectangle
     * @param position
     * @param rectangle
     */
    // public static isCollisionBetweenPositionAndRectangle(position: Position, rectangle: Rectangle): boolean {
    //     return (position.x >= rectangle.position.x
    //         && position.x < rectangle.position.x + rectangle.width
    //         && position.y >= rectangle.position.y
    //         && position.y < rectangle.position.y + rectangle.height)
    // }

    /**
     * Return true if a rectangle A is in collision with a rectangle B
     * @param rectangleA
     * @param rectangleB
     * @return boolean
     */
    // public static isCollisionBetweenRectangles(rectangleA: Rectangle, rectangleB: Rectangle): boolean {
    //
    //     const widthA: number = rectangleA.width / 2;
    //     const heightA: number = rectangleA.height / 2;
    //     const widthB: number = rectangleB.width / 2;
    //     const heightB: number = rectangleB.height / 2;
    //
    //     return !(
    //         (rectangleA.position.x - widthA >= rectangleB.position.x + widthB) // rectA is too much at right
    //         || (rectangleA.position.x + widthA <= rectangleB.position.x - widthB) // too much at left
    //         || (rectangleA.position.y - heightA >= rectangleB.position.y + heightB)      // too much at bot
    //         || (rectangleA.position.y + heightA <= rectangleB.position.y - heightB)// too much at top
    //     )
    // }

    /**
     * Return true if a position is in collision with a circle
     * @param position
     * @param circle
     * @return boolean
     */
    // public static isCollisionBetweenPositionAndCircle(position: Position, circle: Circle): boolean {
    //     const d2 = Math.sqrt((position.x - circle.position.x)) + Math.sqrt((position.y - circle.position.y));
    //     return d2 < circle.ray * circle.ray;
    // }

    /**
     * Return true if a circle A is in collision with a circle B
     * @param circleA
     * @param circleB
     * @return boolean
     */
    // public static isCollisionBetweenCircles(circleA: Circle, circleB: Circle): boolean {
    //     const d2 = Math.sqrt(circleA.position.x - circleB.position.x) + Math.sqrt(circleA.position.y - circleB.position.y);
    //     return (d2 < Math.sqrt(circleA.ray + circleB.ray))
    // }


// calcDeplacement(speed : number, origin : PositionItf, angle : number) : PositionItf {
    //     return new Position(origin.x + speed * Math.cos(angle), origin.y + speed * Math.sin(angle));
    // };

    // public static calcByRate(param: number) {
    //     return param * Config.screen.rate;
    // }
}

import {Canvas} from "../Canvas";
import {PositionItf} from "../../Core/PositionItf";

export interface AnimationItf {
    draw(canvas: Canvas, position: PositionItf): AnimationItf;
}

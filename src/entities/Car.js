import Entity from "./Entity";
import Orientation from "../States/Orientation";
import Easing from "../utils/Easing";

//11 sec -> 70power
//4 sec -> 700power

//11 sec -> 100kmh
//easeOutCubic: t => (--t)*t*t+1,
export default class Car extends Entity {
    constructor() {
        super();
        this.orientation = Orientation.DOWN;

        // States
        this.started = false;
        this.stopping = false;
        this.turning = false;

        this.startTime = 0;
        this.stopTime = 0;

        this.currentSpeed = 0;
        this.rotationPlan = 0;

        this.power = 100;
    }

    start(time) {
        this.startTime = time;
        this.started = true;
        this.stopping = false;
        this.turning = false;
    }

    stop(time) {
        this.stopTime = time;
        this.started = false;
        this.stopping = true;
        this.turning = false;
    }

    turn(o, time) {
        if(this.turning) return;
        this.started = false;
        this.stopping = false;
        this.turning = true;
        this.startTime = time;
        this.rotationPlan = this.rotation + (90 * o);
    }

    /**
     * Returns the orientation
     * @returns {Orientation}
     */
    getOrientation() {
        if (this.rotation === 0) return Orientation.DOWN;
        if (this.rotation === 90 || this.rotation === -270) return Orientation.LEFT;
        if (this.rotation === -90 || this.rotation === 270) return Orientation.RIGHT;
        return Orientation.UP;
    }

    /**
     * Returns the speed per hour
     * @returns {number}
     */
    getSpeedPerHour() {
        return Math.round(this.currentSpeed * 100);
    }

    /**
     * Returns the seconds to get max speed value
     * @returns {number}
     */
    getSecondsToMax(){
        return 770 / this.power;
    }
}
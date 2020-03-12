import Entity from "./Entity";
import Orientation from "../States/Orientation";
import Sprite from "./Sprite";

//11 sec -> 70power
//4 sec -> 700power

//11 sec -> 100kmh
//easeOutCubic: t => (--t)*t*t+1,
export default class Car extends Entity {
    constructor() {
        super();

        // States
        this.turning = false;

        this.startTime = 0;

        this.currentSpeed = 0;
        this.rotationPlan = 0;
        this.stopSpeedFreeze = 0;
        this.velocity = 0;

        // Stats
        this.power = 100;
        this.lighting = false;

        this.carLightsSprite = Sprite.get("lights/carlights0");
        this.stopLightsSprite = Sprite.get("lights/car_stop_lights0");
    }

    setLightSprite(sprite){
        this.carLightsSprite = sprite;
    }

    turn(o, time) {
        if(this.turning) return;
        this.turning = true;
        this.startTime = time;
        this.rotationPlan = this.rotation + (90 * o);
        this.stopSpeedFreeze = this.currentSpeed;
    }

    movement(val, time){
        this.stopSpeedFreeze = this.currentSpeed;
        this.startTime = time;
        this.velocity = val;
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
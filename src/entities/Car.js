import Entity from "./Entity";
import Orientation from "../States/Orientation";
import Sprite from "./Sprite";
import Easing from "../utils/Easing";

export class CarAction {
    constructor(aId) {
        this.aId = aId;
    }
}

CarAction.GO = new CarAction(1);
CarAction.STOPPING = new CarAction(2);
CarAction.STOPPED = new CarAction(3);
CarAction.FREE = new CarAction(4);

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

        // Stats
        this.power = 100;
        this.stopForse = 1.4;

        this.lighting = false;

        this.speedFactor = 0;

        this.carLightsSprite = Sprite.get("lights/carlights0");
        this.stopLightsSprite = Sprite.get("lights/car_stop_lights0");
        this.action = CarAction.STOPPED;
    }

    getNextGrid() {
        if (this.getOrientation() === Orientation.DOWN) return {x: this.gridX, y: this.gridY + 1};
        if (this.getOrientation() === Orientation.UP) return {x: this.gridX, y: this.gridY - 1};
        if (this.getOrientation() === Orientation.LEFT) return {x: this.gridX - 1, y: this.gridY};
        if (this.getOrientation() === Orientation.RIGHT) return {x: this.gridX + 1, y: this.gridY};
    }

    setLightSprite(sprite) {
        this.carLightsSprite = sprite;
    }

    turn(o, time) {
        if (this.turning) return;
        this.turning = true;
        this.startTime = time;
        this.rotationPlan = this.rotation + (90 * o);

    }

    /**
     * Applies the action
     * @param val
     * @param time
     */
    apply(val, time) {
        this.startTime = time;
        this.action = val;
        this.speedFactor = this.currentSpeed;
    }


    /**
     * Returns the speed per hour
     * @returns {number}
     */
    getSpeedPerHour() {
        return Math.round(this.currentSpeed * 100);
    }

    /**
     * Returns the speed lost seconds
     * @returns {number}
     */
    getSecondsToSpeedLost() {
        return 80 * (this.power / 100);
    }

    /**
     * Returns the seconds to get max speed value
     * @returns {number}
     */
    getSecondsToMax() {
        return 700 / this.power;
    }

    /**
     * Returns true if car has moving force
     * @returns {boolean}
     */
    hasMovingForce() {
        return this.action === CarAction.GO || this.action === CarAction.FREE;
    }


    update(time) {
        const stm = this.getSecondsToMax();
        const stl = this.getSecondsToSpeedLost();
        let gone = (time - this.startTime) / 1000;

        // Velocity
        if (this.action === CarAction.GO) {
            let rise = this.speedFactor + ((gone / stm));
            if (rise >= 1) {
                this.currentSpeed = 1;
            } else {
                this.currentSpeed = rise;
            }
        } else if (this.action === CarAction.FREE || this.action === CarAction.STOPPING) {
            const sspd = this.action === CarAction.FREE ? stl : this.stopForse;
            const fell = this.speedFactor - ((gone / sspd));
            if (fell > 0.05) {
                this.currentSpeed = fell;
            } else {
                this.currentSpeed = 0;
                this.speedFactor = 0;
                this.apply(CarAction.STOPPED, time);
                this.fire("stopped");
            }
        }
    }

}

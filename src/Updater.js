import Car from "./entities/Car";
import Easing from "./utils/Easing";
import Orientation from "./States/Orientation";

export default class Updater {

    constructor(game) {
        this.game = game;
    }

    /**
     * Update the game logic
     */
    update() {
        this.updateEntities();
    }

    /**
     * Update entities
     */
    updateEntities() {
        this.game.entities.forEach(entity => this.updateEntity(entity));
    }

    /**
     * Updates the entity
     * @param {Entity} entity
     */
    updateEntity(entity) {
        if (entity instanceof Car) this.updateCar(entity);
    }

    /**
     * Updates the car
     * @param {Car} car
     */
    updateCar(car) {
        const secondsToMax = car.getSecondsToMax();

        // Velocity
        if(car.velocity === 1){
            if(car.currentSpeed < 1) {
                const gone = (this.game.time - car.startTime) / 1000;
                car.currentSpeed = Easing.easeOutCubic((gone / secondsToMax) + car.stopSpeedFreeze);
            }else{
                car.currentSpeed = 1;
            }
        }else if(car.velocity === -1){
            if(car.currentSpeed > 0){
                const gone = (this.game.time - car.startTime) / 1000; //0.2
                car.currentSpeed = Easing.easeOutCubic((0.7 - gone) * car.stopSpeedFreeze);
            }else{
                car.currentSpeed = 0;
                car.velocity = 0;
                car.fire("stopped");
            }
        }

        if (car.turning) {
            if (car.rotationPlan > car.rotation) {
                car.rotation += (car.currentSpeed / 10) * 90;
                if (car.rotation >= car.rotationPlan) {
                    car.turning = false;
                    car.rotation = (car.rotationPlan % 360);
                    car.startTime -= 1000;
                    car.fire("rotated", car.rotation);
                }
            } else {
                car.rotation -= (car.currentSpeed / 10) * 90;
                if (car.rotation <= car.rotationPlan) {
                    car.turning = false;
                    car.rotation = (car.rotationPlan % 360);
                    car.startTime -= 1000;
                    car.fire("rotated", car.rotation);
                }
            }
        }

        if (!car.turning) {
            if (car.getOrientation() === Orientation.DOWN) car.renderY += car.currentSpeed;
            if (car.getOrientation() === Orientation.UP) car.renderY -= car.currentSpeed;
            if (car.getOrientation() === Orientation.LEFT) car.renderX -= car.currentSpeed;
            if (car.getOrientation() === Orientation.RIGHT) car.renderX += car.currentSpeed;
        }

        // Speed generation
        // if (car.started) {
        //     if (car.currentSpeed >= 1) {
        //         car.currentSpeed = 1;
        //     } else {
        //         const gone = (this.game.time - car.startTime) / 1000;
        //         if (car.turning)
        //             car.currentSpeed = Easing.easeOutCubic((gone / 5) * (car.stopSpeedFreeze + 0.04));
        //         else
        //             car.currentSpeed = Easing.easeOutCubic((gone / secondsToMax) + car.stopSpeedFreeze);
        //     }
        // }


    }

}
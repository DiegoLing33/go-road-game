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

        if (car.started) {
            if (car.currentSpeed >= 1) {
                car.currentSpeed = 1;
            } else {
                const gone = (this.game.time - car.startTime) / 1000;
                car.currentSpeed = Easing.easeOutCubic((gone / secondsToMax));
            }
        }

        if (car.stopping) {
            if (car.currentSpeed <= 0) return;
            const gone = (this.game.time - car.stopTime) / 1000;
            car.currentSpeed = 1 - Easing.easeOutCubic(gone / 1.2);
        } else if (car.turning) {
            const gone = (this.game.time - car.startTime) / 1000;
            car.currentSpeed = Easing.easeOutCubic((gone / 1.2));

            if (car.rotationPlan > car.rotation) {
                car.rotation += car.currentSpeed * 90;
                if (car.rotation >= car.rotationPlan) {
                    car.turning = false;
                    car.rotation = (car.rotationPlan % 360);
                }
            } else {
                car.rotation -= car.currentSpeed * 90;
                if (car.rotation <= car.rotationPlan) {
                    car.turning = false;
                    car.rotation = (car.rotationPlan % 360);
                }
            }
        }
        if (car.getOrientation() === Orientation.DOWN) car.renderY += car.currentSpeed;
        if (car.getOrientation() === Orientation.UP) car.renderY -= car.currentSpeed;
        if (car.getOrientation() === Orientation.LEFT) car.renderX -= car.currentSpeed;
        if (car.getOrientation() === Orientation.RIGHT) car.renderX += car.currentSpeed;
    }

}
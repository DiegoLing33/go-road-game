import Car, {CarAction} from "./entities/Car";
import Easing from "./utils/Easing";
import Orientation from "./States/Orientation";
import TrafficLight from "./entities/TrafficLight";

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
        entity.update(this.game.time);
        if (entity instanceof Car) this.updateCar(entity);
    }

    /**
     * Updates the car
     * @param {Car} car
     */
    updateCar(car) {


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
            const nextGrid = car.getNextGrid();
            const entity = this.game.entities.find(v => v.gridX === nextGrid.x && v.gridY === nextGrid.y);
            if(entity){
                if(entity instanceof TrafficLight && entity.isMirrorMe(car)){
                    if(entity.color === -1 && car.hasMovingForce()) {
                        car.apply(CarAction.STOPPING, this.game.time);
                    }
                }
            }

            const changes = car.currentSpeed * (3);
            if (car.getOrientation() === Orientation.DOWN) {
                car.setRenderPosition(car.renderX, car.renderY + changes);
            }
            if (car.getOrientation() === Orientation.UP) {
                car.setRenderPosition(car.renderX, car.renderY - changes);
            }
            if (car.getOrientation() === Orientation.LEFT) {
                car.setRenderPosition(car.renderX - changes, car.renderY);
            }
            if (car.getOrientation() === Orientation.RIGHT) {
                car.setRenderPosition(car.renderX + changes, car.renderY);
            }
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
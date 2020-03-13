import Entity from "./Entity";
import Sprite from "./Sprite";

export default class TrafficLight extends Entity {
    constructor() {
        super();
        this.sprite = Sprite.get("traffic/traffic_light0");

        this.spriteRed = Sprite.get("traffic/traffic_light0_red");
        this.spriteGreen = Sprite.get("traffic/traffic_light0_green");

        this.color = 1;

        this.greenDuration = 10;
        this.redDuration = 10;

        this.lastChangedTime = 0;
    }

    turnColor(color, time) {
        this.color = color;
        this.lastChangedTime = time;
    }

    isCurrentColorOver(time) {
        if (this.color === -1 && time - this.lastChangedTime >= this.redDuration * 1000) return true;
        if (this.color === 1 && time - this.lastChangedTime >= this.greenDuration * 1000) return true;
        return false;
    }

    update(time) {
        if (this.isCurrentColorOver(time)) {
            if (this.color === 1) this.turnColor(-1, time);
            else if (this.color === -1) this.turnColor(1, time);
        }
    }
}
import Mixin from "../utils/Mixin";
import Observable from "../mixins/Observable";

/**
 * The keyboard controller
 */
export default class KeyboardController {


    constructor() {
        this.events = {};
        this.keysMemory = {};

        window.onkeydown = ev => {
            if (!this.keysMemory[ev.key]) {
                this.keysMemory[ev.key] = true;
                this.fire("keydown", ev.key);
            }
        };

        window.onkeyup = ev => {
            this.keysMemory[ev.key] = false;
            this.fire("keyup", ev.key);
        }
    }

    onKeyDown(callback) {
        this.on("keydown", callback);
        return this;
    }

    onKeyUp(callback) {
        this.on("keyup", callback);
        return this;
    }

}

Mixin(KeyboardController, Observable);
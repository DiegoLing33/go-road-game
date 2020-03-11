import Mixin from "../utils/Mixin";
import Loadable from "../mixins/Loadable";

/**
 * The sprite
 */
export default class Sprite {

    constructor(url) {
        this.image = new Image();
        this.ready = false;

        this.image.onload = () => {
            this.ready = true;
        };
        this.image.src = url;
    }

    /**
     * Returns the sprite image
     * @returns {HTMLImageElement}
     */
    getImage() {
        return this.image;
    }

}

Mixin(Sprite, Loadable);
import Mixin from "../utils/Mixin";
import Loadable from "../mixins/Loadable";
import Logger from "../utils/Logger";

/**
 * The sprite
 */
export default class Sprite {

    constructor(url) {
        url = "sprites/" + url;
        if (!url.endsWith(".png")) url += ".png";
        this.image = new Image();
        this.ready = false;

        this.image.onload = () => {
            Logger.log(`Sprite [${url}] loaded!`);
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

Sprite.cache = {};

/**
 * Returns the sprite or it's cache
 * @param {string} name
 * @returns {Sprite}
 */
Sprite.get = function (name) {
    if (!Sprite.cache.hasOwnProperty(name))
        Sprite.cache[name] = new Sprite(name);
    return Sprite.cache[name];
};

Mixin(Sprite, Loadable);
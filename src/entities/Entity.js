/**
 * The entity
 */
import Mixin from "../utils/Mixin";
import Observable from "../mixins/Observable";

export default class Entity {

    constructor() {
        this.renderX = 0;
        this.renderY = 0;
        this.gridX = 0;
        this.gridY = 0;
        this.sprite = null;
        this.visible = true;
        this.rotation = 0;
        this.events = {};
    }

    /**
     * Returns the sprite
     * @returns {Sprite|null}
     */
    getSprite(){
        return this.sprite;
    }

    /**
     * Sets the sprite
     * @param {Sprite|null} sprite
     * @returns {Entity}
     */
    setSprite(sprite){
        this.sprite = sprite;
        return this;
    }

    getGridPosition() {
        return {
            gx: this.gridX,
            gy: this.gridY
        }
    }

    getRenderPosition() {
        return {
            x: this.renderX,
            y: this.renderY
        }
    }

}

Mixin(Entity, Observable);
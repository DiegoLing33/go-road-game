/**
 * The entity
 */
import config from "../config/config";
import Mixin from "../utils/Mixin";
import Observable from "../mixins/Observable";
import Orientation from "../States/Orientation";

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
     * Sets the grid position
     * @param x
     * @param y
     */
    setGridPosition(x, y){
        this.gridX = x;
        this.gridY = y;
        this.renderX = x * config.ts;
        this.renderY = y * config.ts;
    }

    setRenderPosition(x, y){
        this.renderX = x;
        this.renderY = y;
        this.gridX = Math.floor(x / config.ts);
        this.gridY = Math.floor(y / config.ts);
    }

    /**
     * Sets the rotation
     * @param deg
     */
    setRotation(deg){
        this.rotation  = (deg % 360);
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
     * Returns the orientation that opp. to entity
     * @returns {Orientation}
     */
    getMirrorOrientation(){
        if(this.getOrientation() === Orientation.DOWN) return Orientation.UP;
        if(this.getOrientation() === Orientation.UP) return Orientation.DOWN;
        if(this.getOrientation() === Orientation.LEFT) return Orientation.RIGHT;
        if(this.getOrientation() === Orientation.RIGHT) return Orientation.LEFT;
    }

    /**
     * Returns true if entity on opp. side
     * @param entity
     * @returns {boolean}
     */
    isMirrorMe(entity){
        return entity.getOrientation() === this.getMirrorOrientation();
    }

    update(time){

    }
}

Mixin(Entity, Observable);
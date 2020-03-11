import config from "./config/config";
import MasterRender from "./render/MaserRender";
import Updater from "./Updater";

export default class Game {

    constructor() {
        /**
         * @type {Map}
         */
        this.map = null;

        /**
         * @type {MasterRender}
         */
        this.render = null;

        /**
         * @type {Camera}
         */
        this.camera = null;

        this.mouseX = 0;
        this.mouseY = 0;

        this.entities = [];
        this.time = new Date().getTime();

        this.updater = new Updater(this);
    }

    /**
     * Returns the mouse grid position
     * @returns {{x: number, y: number}}
     */
    getMouseGrid() {
        const x = Math.floor(this.mouseX / config.ts);
        const y = Math.floor(this.mouseY / config.ts);
        return {x, y};
    }

    /**
     * Sets the map
     * @param {Map} map
     */
    setMap(map) {
        this.map = map;
    }

    /**
     * Sets the render
     * @param {MasterRender} render
     */
    setRender(render) {
        this.render = render;
    }

    /**
     * Sets the camera
     * @param {Camera} camera
     */
    setCamera(camera) {
        this.camera = camera;
    }

    /**
     * Setting up the master render
     */
    setUpMasterRender() {
        const masterRender = new MasterRender(this,
            document.getElementById("ec"),
            document.getElementById("tc")
        );
        this.setRender(masterRender);
    }

    tick() {
        this.time = new Date().getTime();
        this.updater.update();
        this.render.render();
        requestAnimationFrame(this.tick.bind(this));
    }

    startGameLoop() {
        const wait = setInterval(() => {
            if (this.camera) {
                clearInterval(wait);
                this.setUpMasterRender();
                requestAnimationFrame(this.tick.bind(this));
            }
        }, 200);
    }

    /**
     * Adds the entity
     * @param entity
     */
    addEntity(entity) {
        this.entities.push(entity);
    }
}

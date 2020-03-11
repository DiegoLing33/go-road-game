import config from "./config/config";
import Logger from "./utils/Logger";

export default class Camera {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        const ts = config.ts;
        this.gridHeight = Math.floor(this.height / ts);
        this.gridWidth = Math.floor(this.width / ts);

        Logger.log(`Created camera: ${this.gridWidth} x ${this.gridHeight}` );
    }

}
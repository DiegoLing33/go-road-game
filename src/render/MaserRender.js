import config from "../config/config";
import GUIRender from "./GUIRender";
import Car, {CarAction} from "../entities/Car";
import Sprite from "../entities/Sprite";
import TrafficLight from "../entities/TrafficLight";

export default class MasterRender {

    constructor(game, entityCanvas, textCanvas, mapCanvas) {
        this.game = game;

        this.entityCanvas = entityCanvas;
        this.textCanvas = textCanvas;
        this.mapCanvas = mapCanvas;

        this.entityCanvas.width = game.camera.width;
        this.entityCanvas.height = game.camera.height;

        this.textCanvas.width = game.camera.width;
        this.textCanvas.height = game.camera.height;

        this.mapCanvas.width = game.camera.width;
        this.mapCanvas.height = game.camera.height;

        /**
         * @type {CanvasRenderingContext2D}
         */
        this.mapContext = this.mapCanvas.getContext("2d");

        /**
         * @type {CanvasRenderingContext2D}
         */
        this.entityContext = this.entityCanvas.getContext("2d");
        this.entityContext.lineHeight = 1.1;

        /**
         * @type {CanvasRenderingContext2D}
         */
        this.textContext = this.textCanvas.getContext("2d");
        this.textContext.lineHeight = 1.1;
        this.guiRender = new GUIRender(this);

        this.setFont(this.textContext, 22, "Arial");

        this.FPS = 0;
        this.frame = 0;
        this.lastUpdatedTime = 0;
    }

    /**
     * Sets the font
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} size
     * @param {string} [name]
     */
    setFont(ctx, size, name) {
        name = name || "Arial";
        ctx.font = `${size}px ${name}`;
    }

    /**
     * Returns the font size
     * @param {CanvasRenderingContext2D} ctx
     * @returns {number}
     */
    getFontSize(ctx) {
        return parseInt(ctx.font.split("px")[0]);
    }

    /**
     * Fills with color
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} gx
     * @param {number} gy
     * @param {number} gw
     * @param {number} gh
     * @param {string} color
     */
    rect(ctx, gx, gy, gw, gh, color) {
        const ts = config.ts;
        color = color || "#000000";
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(gx * ts, gy * ts, gw * ts, gh * ts);
        ctx.restore();
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param gx
     * @param gy
     * @param gw
     * @param gh
     * @param color
     */
    strokeRect(ctx, gx, gy, gw, gh, color) {
        const ts = config.ts;
        color = color || "#ffffff";
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.strokeRect(gx * ts, gy * ts, gw * ts, gh * ts);
        ctx.restore();
    }

    /**
     * Clears the context
     * @param {CanvasRenderingContext2D} ctx
     */
    clear(ctx) {
        const camera = this.game.camera;
        ctx.clearRect(0, 0, camera.width, camera.height);
    }


    /**
     * Draws text
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {string} [color]
     */
    drawText(ctx, text, x, y, color) {
        const fs = this.getFontSize(ctx);
        color = color || "#000000";

        ctx.save();
        ctx.fillStyle = color;
        ctx.fillText(text, x, y + fs);
        ctx.restore();
    }

    /**
     * Draws multiline text
     * @param {CanvasRenderingContext2D|{lineHeight}} ctx
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {string} color
     * @param {number} [lineHeight]
     */
    drawMultilineText(ctx, text, x, y, color, lineHeight) {
        const lh = (lineHeight || ctx.lineHeight) || 1.1;
        const fs = this.getFontSize(ctx);
        const spacing = lh * fs;
        const lines = text.split("\n");
        lines.forEach((line, i) => {
            this.drawText(ctx, line, x, y + (spacing * i), color);
        });
    }


    /**
     * Draws very simple image (RECT IMAGE)
     * @param {CanvasRenderingContext2D} ctx
     * @param {HTMLImageElement} image
     * @param {number} x
     * @param {number} y
     * @param {number} [width]
     * @param {number} [height]
     */
    drawImageSimple(ctx, image, x, y, width, height) {
        const ts = config.ts;
        width = width || ts;
        height = height || ts;
        ctx.save();
        ctx.drawImage(image, 0, 0, image.width, image.height, x, y, width, height);
        ctx.restore();
    }

    /**
     * Draws rotated image
     * @param ctx
     * @param image
     * @param x
     * @param y
     * @param deg
     * @param {number} [width]
     * @param {number} [height]
     */
    drawImageSimpleRotated(ctx, image, x, y, deg, width, height) {
        const ts = config.ts;
        width = width || ts;
        height = height || ts;
        const rad = deg * Math.PI / 180;
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(rad);
        const nx = width / 2 * (-1);
        const ny = height / 2 * (-1);
        this.drawImageSimple(ctx, image, nx, ny, width, height);
        ctx.restore();
    }

    /**
     * Draws the entity
     * @param ctx
     * @param entity
     */
    drawEntity(ctx, entity) {
        const sprite = entity.sprite;
        const ts = config.ts;
        if (!sprite || sprite.isReady() === false) return;

        const {x, y} = entity.getRenderPosition();
        const deg = entity.rotation;
        const rad = deg * Math.PI / 180;
        const image = entity.sprite.getImage();
        ctx.save();
        ctx.translate(x + ts / 2, y + ts / 2);
        ctx.rotate(rad);
        const nxy = ts / 2 * (-1);
        this.drawImageSimple(ctx, image, nxy, nxy);

        if (entity instanceof Car) {
            if (entity.lighting && entity.carLightsSprite && entity.carLightsSprite.isReady()) {
                this.drawImageSimple(ctx, entity.carLightsSprite.getImage(), nxy, nxy + (ts * 0.65));
            }

            if (entity.stopLightsSprite && entity.stopLightsSprite.isReady()) {
                ctx.save();
                if (entity.action === CarAction.STOPPING) ctx.globalAlpha = 1;
                else if (entity.action === CarAction.STOPPED) ctx.globalAlpha = 0.66;
                else if (entity.hasMovingForce() && entity.lighting) ctx.globalAlpha = 0.3;
                else ctx.globalAlpha = 0;
                this.drawImageSimple(ctx, entity.stopLightsSprite.getImage(), nxy, nxy - (ts * 0.29));
                ctx.restore();
            }
        } else if (entity instanceof TrafficLight) {
            if (entity.color === -1)
                this.drawImageSimple(ctx, entity.spriteRed.getImage(), nxy, nxy);
            else if (entity.color === 1)
                this.drawImageSimple(ctx, entity.spriteGreen.getImage(), nxy, nxy);
        }


        ctx.restore();
    }

    /**
     * Draws the target cell
     */
    drawTarget() {
        const {x, y} = this.game.getMouseGrid();
        this.strokeRect(this.entityContext, x, y, 1, 1, "#000000");

        if (this.game.mapEditor.enabled)
            this.strokeRect(this.entityContext, this.game.selectedX, this.game.selectedY,
                1, 1, "#aa0000");
    }

    reset() {
        this.clear(this.entityContext);
        this.clear(this.textContext);
    }

    countFPS() {
        const time = new Date().getTime();
        if (time - this.lastUpdatedTime >= 1000) {
            this.FPS = this.frame;
            this.lastUpdatedTime = time;
            this.frame = 0;
            return;
        }
        this.frame++;
    }

    renderMap() {
        this.clear(this.mapContext);
        const ts = config.ts;
        const {width, height} = this.game.map.getSize();
        const data = this.game.map.data.map;
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const it = data[j][i];
                if (it instanceof Array)
                    it.forEach(tile => {
                        if (tile.hasOwnProperty("t")) {

                            this.drawImageSimpleRotated(this.mapContext,
                                Sprite.get(tile.t).image, i * ts, j * ts, tile.r || 0);
                        }
                    });
            }
        }
    }

    render() {
        this.reset();
        this.drawTarget();
        this.game.entities.forEach(entity => this.drawEntity(this.entityContext, entity));
        this.guiRender.drawDebugInfo();
        this.countFPS();
    }

}
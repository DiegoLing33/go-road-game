import Sprite from "../entities/Sprite";

export default class GUIRender {

    /**
     * Constructor
     * @param {MasterRender} masterRender
     */
    constructor(masterRender) {
        this.masterRender = masterRender;
        this.game = masterRender.game;
    }

    drawSpeedBar(car, ctx, x, y, sizeValue){

        const width = sizeValue;
        const height = sizeValue;

        this.masterRender.drawImageSimple(ctx,
            Sprite.get("ui/speed_panel").getImage(), x, y, sizeValue, sizeValue);
        const deg = car.currentSpeed * 240;
        const sph = car.getSpeedPerHour();
        this.masterRender.drawImageSimpleRotated(ctx,
            Sprite.get("ui/speed_arrow").getImage(), x, y, deg, sizeValue, sizeValue);
        ctx.save();
        ctx.textAlign = "center";
        this.masterRender.setFont(ctx, 12);
        this.masterRender.drawText(ctx, `${sph} km/h`, x + width / 2, y + sizeValue - 20, "#ffffff");
        ctx.restore();

    }

    drawDebugInfo() {
        if (!this.game.entities[0]) return;
        const car = this.game.entities[0];

        this.drawSpeedBar(car, this.masterRender.textContext, 400, 10, 100);

        this.masterRender.drawMultilineText(this.masterRender.textContext,
            `FPS: ${this.masterRender.FPS}\n`
            , 200, 0);
    }

}
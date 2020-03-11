export default class GUIRender {

    /**
     * Constructor
     * @param {MasterRender} masterRender
     */
    constructor(masterRender) {
        this.masterRender = masterRender;
        this.game = masterRender.game;
    }


    drawDebugInfo() {
        if (!this.game.entities[0]) return;
        const car = this.game.entities[0];

        this.masterRender.drawMultilineText(this.masterRender.textContext,
            `FPS: ${this.masterRender.FPS}\nSpeed: ${car.getSpeedPerHour()}\nRotation: ${car.rotation}`
            , 200, 0);
    }

}
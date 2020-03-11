import Game from "./Game";
import Camera from "./Camera";
import Screen from "./utils/Screen";
import MasterRender from "./render/MaserRender";

export default class Client {
    constructor() {
        this.game = null;
    }

    createGame() {
        const game = new Game();

        const screenWidth = Screen.getWidth();
        const screenHeight = Screen.getHeight();

        const camera = new Camera(screenWidth, screenHeight);


        game.setCamera(camera);
        return game;
    }
}
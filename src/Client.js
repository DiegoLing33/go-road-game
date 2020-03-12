import Game from "./Game";
import Camera from "./Camera";
import Screen from "./utils/Screen";
import KeyboardController from "./controllers/KeyboardController";

export default class Client {
    constructor() {
        this.game = null;
        this.keyboard = new KeyboardController();
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
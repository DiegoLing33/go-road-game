import Client from "./Client";
import Sprite from "./entities/Sprite";
import Car from "./entities/Car";

window.onload = function () {
    const client = new Client();
    const game = client.createGame();
    game.startGameLoop();

    window.onmousemove = ev => {
        game.mouseX = ev.pageX;
        game.mouseY = ev.pageY;
    };

    const carSprite = new Sprite("sprites/greencar.png");
    const car = new Car();
    car.setSprite(carSprite);
    game.addEntity(car);

    client.keyboard.onKeyDown(key => {
        if (key === 'w') car.movement(1, game.time);
        if (key === 'q') car.turn(1, game.time);
        if (key === 'e') car.turn(-1, game.time);
    }).onKeyUp(key => {
        if (key === 'w') car.movement(-1, game.time);
    });

};
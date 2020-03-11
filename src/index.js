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

    window.onkeydown = ev => {
      if(ev.key === '1') car.start(game.time);
      if(ev.key === '2') car.stop(game.time);
      if(ev.key === '3') car.turn(1, game.time);
      if(ev.key === '4') car.turn(-1, game.time);
    };
};
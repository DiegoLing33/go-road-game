import Client from "./Client";
import Sprite from "./entities/Sprite";
import Car from "./entities/Car";
import Map from "./Map";

window.onload = function () {
    const client = new Client();
    const game = client.createGame();
    const map = new Map("src/config/map.json");

    Sprite.get("road/road0");
    Sprite.get("road/lines0");

    Sprite.get("road/strips_solid_single");
    Sprite.get("road/strips_solid_double");
    Sprite.get("road/strips_solid_cross_2");

    Sprite.get("road/strips_dashed_single");
    Sprite.get("road/strips_dashed_double");

    Sprite.get("road/strips_dashed_cross_4");
    Sprite.get("road/strips_dashed_cross_3");

    Sprite.get("ui/speed_panel");
    Sprite.get("ui/speed_arrow");

    map.wait(()=>{
        game.setMap(map);
        game.startGameLoop();
    });

    window.onmousemove = ev => {
        game.mouseX = ev.pageX;
        game.mouseY = ev.pageY;
    };

    const car = new Car();
    car.setSprite(Sprite.get("greencar"));

    game.addEntity(car);


    let editorTarget = null;

    client.keyboard.onKeyDown(key => {
        if (key === 'w') car.movement(1, game.time);
        if (key === 'd') car.turn(1, game.time);
        if (key === 'a') car.turn(-1, game.time);
        if (key === 'e') car.lighting = !car.lighting;
        if (key === '/') game.selectedX = game.selectedY = -1;

        if(key === "r"){
            if(editorTarget !== null && editorTarget instanceof Array){
                editorTarget.forEach(it => it.r = ((it.r || 0) + 90) % 360);
                game.render.renderMap();
            }
        }
    }).onKeyUp(key => {
        if (key === 'w') car.movement(-1, game.time);
    });


    document.onclick = () => {
        const {x, y} = game.getMouseGrid();
        game.selectedX = x;
        game.selectedY = y;
        editorTarget = map.data.map[y][x];

    };

};
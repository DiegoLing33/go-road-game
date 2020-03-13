import Client from "./Client";
import Sprite from "./entities/Sprite";
import Car, {CarAction} from "./entities/Car";
import Map from "./Map";
import TrafficLight from "./entities/TrafficLight";

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

    Sprite.get("road/strip_stop0");

    Sprite.get("traffic/traffic_light0");
    Sprite.get("traffic/traffic_light0_red");
    Sprite.get("traffic/traffic_light0_green");

    Sprite.get("ui/speed_panel");
    Sprite.get("ui/speed_arrow");

    Sprite.get("cars/car0_red");
    Sprite.get("cars/car0_black");

    map.wait(() => {
        game.setMap(map);
        game.startGameLoop();
    });

    window.onmousemove = ev => {
        game.mouseX = ev.pageX;
        game.mouseY = ev.pageY;
    };

    const car = new Car();
    car.setSprite(Sprite.get("cars/car0_black"));

    const tfl = new TrafficLight();
    tfl.setGridPosition(0, 2);
    tfl.setRotation(180);

    game.addEntity(car);
    game.addEntity(tfl);


    let editorTarget = null;

    client.keyboard.onKeyDown(key => {
        if (key === 'w') car.apply(CarAction.GO, game.time);
        if (key === 's') car.apply(CarAction.STOPPING, game.time);
        if (key === 'd') car.turn(1, game.time);
        if (key === 'a') car.turn(-1, game.time);
        if (key === 'e') car.lighting = !car.lighting;
        if (key === '/') game.selectedX = game.selectedY = -1;

        if (key === "r") {
            if (editorTarget !== null && editorTarget instanceof Array) {
                editorTarget.forEach(it => it.r = ((it.r || 0) + 90) % 360);
                game.render.renderMap();
            }
        }
        if (key === "g") {
            if (editorTarget !== null && editorTarget instanceof Array) {
                editorTarget.splice(0, editorTarget.length);
                game.render.renderMap();
            }
        }
        if (key === "h") {
            if (game.mapEditor.visible) game.mapEditor.hideBar();
            else game.mapEditor.showMapCode();
        }
        if (key === "b") {
            if (game.mapEditor.visible) game.mapEditor.hideBar();
            else game.mapEditor.showSpriteSelection(sprite => {
                game.clearSelection();
                editorTarget.push({t: sprite.name});
                game.render.renderMap();
                editorTarget = null;
            });
        }
    }).onKeyUp(key => {
        if (key === 'w') car.apply(CarAction.FREE, game.time);
        if (key === 's') car.apply(CarAction.FREE, game.time);
    });


    document.onclick = (e) => {
        if (e.target.id !== "tc") return;
        const {x, y} = game.getMouseGrid();
        game.selectedX = x;
        game.selectedY = y;
        editorTarget = map.data.map[y][x];

    };

};
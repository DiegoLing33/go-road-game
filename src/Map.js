import Mixin from "./utils/Mixin";
import Loadable from "./mixins/Loadable";
import Observable from "./mixins/Observable";
import Logger from "./utils/Logger";

export default class Map {

    constructor(path) {
        this.path = path;
        this.data = null;
        this.events = {};
        fetch(this.path).then(v => v.json()).then((value) => {
            this.data = value;
            Logger.log(`Map ${path} loaded!`);
            this.ready = true;
        });
    }

    /**
     * Returns the map size
     * @returns {{width: *, height: *}}
     */
    getSize() {
        return {width: this.data.width, height: this.data.height};
    }
}

Mixin(Map, Loadable);
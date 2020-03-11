export default class Orientation {
    /**
     * Constructor
     * @param oId
     */
    constructor(oId) {
        this.oId = oId;
    }
}

Orientation.DOWN = new Orientation(1);
Orientation.UP = new Orientation(2);
Orientation.LEFT = new Orientation(3);
Orientation.RIGHT = new Orientation(4);
import Sprite from "./entities/Sprite";

/**
 * The map editor
 */
export default class MapEditor {

    constructor(game) {
        this.game = game;
        this.enabled = true;

        this.bar = document.getElementById("bar");
        this.body = this.bar.getElementsByClassName("body")[0];
        this.header = this.bar.getElementsByClassName("header")[0];
        this.close = this.bar.getElementsByClassName("close")[0];

        this.close.onclick = () => this.hideBar();

        this.bar.style["right"] = "-30%";
        this.barTransition = null;
        this.visible = false;
    }

    /**
     * Shows the bar
     */
    showBar() {
        clearInterval(this.barTransition);
        this.bar.style["display"] = "block";
        this.barTransition = setInterval(() => {
            const bsr = parseInt((this.bar.style.right || "0%").split("%")[0]);
            if (bsr >= 0) {
                clearInterval(this.barTransition);
                this.bar.style["right"] = "0%";
                this.visible = true;
            } else this.bar.style["right"] = (bsr + 1) + "%";
        }, 5);
    }

    /**
     * Hides the bar
     */
    hideBar() {
        clearInterval(this.barTransition);
        this.bar.style["display"] = "block";
        this.barTransition = setInterval(() => {
            const bsr = parseInt((this.bar.style.right || "0%").split("%")[0]);
            if (bsr <= "-30") {
                clearInterval(this.barTransition);
                this.bar.style["display"] = "none";
                this.bar.style["right"] = "-30%";
                this.visible = false;
            } else this.bar.style["right"] = (bsr - 1) + "%";
        }, 5);
    }

    toggleBar() {
        if (this.visible) this.hideBar();
        else this.showBar();
    }

    /**
     * Shows sprite selection
     * @param spriteSelectedCallback
     */
    showSpriteSelection(spriteSelectedCallback) {
        this.header.innerHTML = "Sprites";
        this.body.innerHTML = "";
        const categories = {};

        Object.values(Sprite.cache).forEach((sprite) => {
            const div = document.createElement("div");
            div.classList.add("item");

            const img = document.createElement("img");
            img.src = sprite.getImage().src;
            img.style["width"] = "100%";

            div.onclick = () => {
                spriteSelectedCallback(sprite);
                this.hideBar();
            };
            div.append(img);

            const category = sprite.name.split("/")[0];
            if (!categories.hasOwnProperty(category)) categories[category] = [];
            categories[category].push(div);
        });

        Object.keys(categories).forEach(category => {
            const subHeader = document.createElement("div");
            subHeader.classList.add("sub-header");
            subHeader.innerText = category;
            this.body.append(subHeader);

            const container = document.createElement("div");
            container.classList.add("container");
            categories[category].forEach(item => {
                container.append(item);
            });
            this.body.append(container);
        });
        this.showBar();
    }

    showMapCode() {
        this.header.innerHTML = "Map Code";
        const text = document.createElement("textarea");
        text.style["width"] = "100%";
        text.style["height"] = "90%";
        text.innerText = JSON.stringify(this.game.map.data);
        this.body.innerHTML = "";
        this.body.append(text);
        this.showBar();
    }
}
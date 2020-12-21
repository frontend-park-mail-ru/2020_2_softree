import { id } from '../Softer/utils';

export default class CanvasObject {
    constructor(x, y) {
        this.state = {};
        this.id = id();
        this.position = { x, y };
    }

    mouseIn(x, y) {}

    hover(x, y) {}

    click(x, y) {}

    mouseOver(x, y) {}

    __mouseOver(x, y) {
        if (!this.mouseIn(x, y)) {
            this.mouseOver(x, y);
        }
    }

    __hover(x, y) {
        if (this.mouseIn(x, y)) {
            this.hover(x, y);
        }
    }

    __click(x, y) {
        if (this.mouseIn(x, y)) {
            this.click(x, y);
        }
    }

    draw(context) {
        this.context = context;
    }
}

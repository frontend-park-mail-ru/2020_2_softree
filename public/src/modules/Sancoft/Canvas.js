import { Component } from "../Softer/Softer";
import ObjectStore from "./ObjectStore";
import Styler from "../Styler";

export default class Canvas extends Component {
    constructor(props) {
        super(props);

        this.store = new ObjectStore();
    }

    __adaptive() {
        this.node.width = this.node.offsetWidth;
        this.node.height = this.node.offsetHeight;
        this.draw();
    }

    drawObject(object) {
        object.draw(this.context);
        this.store.add(object);
    }


    circle(x, y, radius) {
        this.context.arc(x, y, radius, 0, Math.PI * 2);
    }

    clear() {
        this.node.removeEventListener('mousemove', this.__mousemove);
        super.clear();
        window.removeEventListener('resize', this.__adaptive);
    }

    __mousemove(e) {
        this.store.hover(e.offsetX, e.offsetY);
        this.store.mouseOver(e.offsetX, e.offsetY);
    }

    __click(e) {
        this.click(e.offsetX, e.offsetY);
        this.store.click(e.offsetX, e.offsetY);
    }

    click(x, y) {}

    draw() {}

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }
        const canvas = this.create(`
        <canvas class="${this.props.className || ''}" style="${Styler(style)}"></canvas>
        `)

        setTimeout(() => {
            this.context = this.node.getContext('2d');
            this.node.addEventListener('mousemove', this.__mousemove.bind(this));
            this.node.addEventListener('click', this.__click.bind(this));
            this.__adaptive();
            window.addEventListener('resize', this.__adaptive.bind(this));
        }, 10);

        return canvas;
    }
}

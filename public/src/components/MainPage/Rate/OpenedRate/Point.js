import CanvasObject from '../../../../modules/Sancoft/CanvasObect';

export default class Point extends CanvasObject {
    constructor(x, y, radius, color, value, reset) {
        super(x, y);
        this.radius = radius;
        this.color = color;
        this.value = value;
        this.reset = reset;

        this.iShovered = false;
    }

    mouseIn(x, y) {
        const { radius } = this,
            distanceX = x - this.position.x,
            distanceY = y - this.position.y;

        return Math.round(Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))) <= radius + 1;
    }

    hover(x, y) {
        if (this.iShovered) {
            return;
        }
        const fontSize = 14;
        const width = 50;
        const height = fontSize + 4;
        this.context.fillStyle = 'rgb(0, 0, 0, 0.8)';
        this.context.fillRect(x - width / 2, y - height - 10, width, height);
        this.context.fillStyle = 'white';
        this.font = 'bold 14px sans-serif';
        this.context.fillText(this.value.toFixed(3), x - width / 2 + 2, y - height + height / 2 - 4);

        this.iShovered = true;
    }

    mouseOver(x, y) {
        if (!this.iShovered) {
            return;
        }
        this.reset();
    }

    draw(context) {
        this.context = context;
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        this.context.fill();
    }
}

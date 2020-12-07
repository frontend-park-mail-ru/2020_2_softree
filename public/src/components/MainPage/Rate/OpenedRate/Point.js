import CanvasObject from "../../../../modules/Sancoft/CanvasObect";

export default class Point extends CanvasObject {

    mouseIn(x, y) {
        const {radius} = this,
            distanceX = x - this.position.x,
            distanceY = y - this.position.y

        return Math.round(Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))) <= radius;
    }

    hover(x, y) {
        this.context.fillStyle = 'rgb(255, 0, 0)';
        this.context.beginPath();
        this.radius = 3;
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        this.context.fill()
    }

    draw(context) {
        this.context = context;
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.beginPath();
        this.radius = 2;
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        this.context.fill()
    }
}

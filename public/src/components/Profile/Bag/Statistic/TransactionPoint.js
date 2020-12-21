import CanvasObject from '../../../../modules/Sancoft/CanvasObect';

export default class TransactionPoint extends CanvasObject {
    constructor(x, y1, y2, transaction, reset) {
        super(x, y1);
        this.y2 = y2;
        this.transaction = transaction;
        this.reset = reset;

        this.isHovered = false;
    }

    mouseIn(x, y) {
        return x >= this.position.x - 1 && x <= this.position.x + 1;
    }

    hover(x, y) {
        if (this.isHovered) {
            return;
        }

        this.context.fillStyle = 'white';
        this.context.fillRect(x, y, 100, 100);
    }

    mouseOver(x, y) {
        this.reset();
    }

    draw(context) {
        super.draw(context);
        this.context.beginPath();
        this.context.moveTo(this.position.x, this.position.y);
        this.context.lineTo(this.position.x, this.y2);
        this.context.stroke();
    }
}

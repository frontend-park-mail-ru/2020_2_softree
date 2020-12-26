import Canvas from '../../../../modules/Sancoft/Canvas';
import Point from './Point';

const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default class Chart extends Canvas {
    constructor(props) {
        super(props);

        this.padding = 20;
        this.minXInterval = undefined;
        this.YIntervales = 10;

        this.initValues();
    }

    initValues() {
        this.minValue = Math.min(...this.props.Y.values);
        this.maxValue = Math.max(...this.props.Y.values);
    }

    draw() {
        this.initValues();

        this.store.clear();
        this.context.clearRect(0, 0, this.node.width, this.node.height);

        this.__drawAxis();

        this.__drawChart();

        if (this.minValue !== this.maxValue) {
            this.drawInitialLine();
        }
        this.drawLastValue();
    }

    __drawAxis() {
        this.__drawAxisLines();

        this.__drawXPoints([]);

        if (this.minValue !== this.maxValue) {
            this.__drawYPoints();
        }
    }

    lengthYAxis() {
        return this.node.height - 3 * this.padding;
    }

    lengthXAxis() {
        return this.xPositionOfYAxis() - this.padding;
    }

    chooseColor() {
        const initial = this.props.Y.values[0];
        const last = this.props.Y.values.slice(-1)[0];
        return last < initial ? 'red' : 'green';
    }

    __drawChart() {
        const { Y } = this.props;
        const { padding } = this;
        const yFactor = this.yFactor(Y.values);
        const xInterval = this.__xInterval();
        const lengthYAxis = this.lengthYAxis();

        let getY = value => 2 * padding + lengthYAxis - (value - this.minValue) * yFactor;
        if (this.minValue === this.maxValue) {
            getY = value => lengthYAxis / 2 + padding;
        }

        let currX = padding;
        const color = this.chooseColor();
        this.context.strokeStyle = color;
        this.context.lineWidth = 2;
        const redraw = this.draw.bind(this);
        for (let idx = 1; idx < Y.values.length; idx++) {
            const prev = getY(Y.values[idx - 1]);
            const curr = getY(Y.values[idx]);

            this.context.beginPath();
            this.context.moveTo(currX, prev);
            this.context.lineTo(currX + xInterval, curr);
            this.context.stroke();

            const point = new Point({
                x: currX,
                y: prev,
                radius: 2,
                color: color,
                value: Y.values[idx - 1],
                reset: redraw,
            });
            this.drawObject(point);

            currX += xInterval;
        }
        this.context.stroke();
        this.context.lineWidth = 1;
    }

    normaliseTime(time) {
        return ('' + time).padStart(2, '0');
    }

    drawInitialLine() {
        const { Y } = this.props;
        const { padding } = this;
        const initial = Y.values[0];
        const lengthYAxis = this.lengthYAxis();
        const minY = this.minValue;
        const yFactor = this.yFactor(Y.values);
        const getY = value => 2 * padding + lengthYAxis - (value - minY) * yFactor;

        const y = getY(initial);

        this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        this.context.beginPath();
        this.context.moveTo(padding, y);
        this.context.lineTo(this.xPositionOfYAxis(), y);
        this.context.stroke();

        const last = Y.values.slice(-1)[0];
        const diff = (last - initial).toFixed(3);
        const position = diff < 0 ? y - 10 : y + 15;
        const text = diff < 0 ? diff : '+' + diff;
        const x = this.xPositionOfYAxis() - 50;

        this.context.fillStyle = 'white';
        this.context.fillRect(x - 10, position - 15, 70, 20);

        this.context.fillStyle = diff < 0 ? 'red' : 'green';
        this.context.fillText(text, x, position);
    }

    __drawXPoints(points) {
        const { padding } = this;
        this.context.font = '11px sans-serif';
        const xFactor = this.__xFactor(this.props.X.values);
        const xMin = this.props.X.values[0];
        this.xMin = xMin;

        let format = date => `${this.normaliseTime(date.getHours())}:${this.normaliseTime(date.getMinutes())}`;
        let margin = 5;
        let width = 27;
        let text = (date, x) => this.context.fillText(format(date), x - width / 2, this.node.height - padding + 15);

        switch (this.props.period) {
            case 'week':
                width = 50;
                margin = 10;
                format = date =>
                    `${date.getDate()} ${weekDays[date.getDay()]} ${this.normaliseTime(
                        date.getHours(),
                    )}:${this.normaliseTime(date.getMinutes())}`;
                break;
            case 'year':
            case 'month':
                width = 25;
                margin = 10;
                format = date => `${this.normaliseTime(date.getDate())}.${this.normaliseTime(date.getMonth() + 1)}`;
                break;
        }

        for (let currX = this.xPositionOfYAxis() - width; currX > padding; currX -= width + 2 * margin) {
            this.__drawPoint(currX, this.node.height - padding, 'gray');
            const date = new Date(xMin + currX / xFactor);
            this.context.fillStyle = 'black';
            text(date, currX);
        }
    }

    drawLastValue() {
        const { Y } = this.props;
        const { padding } = this;
        const lastValue = Y.values.slice(-1)[0];
        const lengthYAxis = this.lengthYAxis();
        const minY = this.minValue;
        const yFactor = this.yFactor(Y.values);
        let getY = value => 2 * padding + lengthYAxis - (value - minY) * yFactor;
        if (minY === this.maxValue) {
            getY = value => lengthYAxis / 2 + padding;
        }
        const y = getY(lastValue);

        this.context.fillStyle = 'white';
        this.context.fillRect(this.xPositionOfYAxis() + 4, y - 12, 100, 15);
        this.context.font = 'bolder 14px sans-serif';
        this.context.fillStyle = 'black';
        this.context.fillText('' + lastValue.toFixed(3), this.xPositionOfYAxis() + 5, y);
    }

    __drawYPoints() {
        const { padding } = this;
        const interval = this.__yInterval();
        const max = this.maxValue;
        const intervalCost = interval / this.yFactor(this.props.Y.values);
        const getValue = num => max - intervalCost * num;
        let idx = 0;
        this.context.font = '14px sans-serif';
        for (let currY = 2 * padding; currY < this.node.height - padding; currY += interval) {
            this.__drawPoint(this.xPositionOfYAxis(), currY, 'gray');
            const value = getValue(idx);
            idx++;
            this.context.fillStyle = 'black';
            this.context.fillText('' + value.toFixed(3), this.xPositionOfYAxis() + 5, currY);
        }
    }

    __xInterval() {
        const { X } = this.props;
        const { minXInterval, padding } = this;
        const length = this.xPositionOfYAxis() - padding;
        const interval = length / (X.values.length - 1);
        return minXInterval ? (interval < minXInterval ? interval : minXInterval) : interval;
    }

    __yInterval() {
        const { YIntervales, padding } = this;
        const length = this.node.height - 3 * padding;
        return length / YIntervales;
    }

    __factor(values, length) {
        let max = Math.max(...values);
        let min = Math.min(...values);
        if (max === min) {
            max += 1;
            min -= min < 1 ? 0 : 1;
        }
        const diff = max - min;
        return length / diff;
    }

    yFactor(values) {
        const length = this.lengthYAxis();
        return this.__factor(values, length);
    }

    __xFactor(values) {
        const length = this.lengthXAxis();
        this.xFactor = this.__factor(values, length);
        return this.xFactor;
    }

    __drawPoint(x, y, color = 'black') {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, 2, 0, Math.PI * 2);
        this.context.fill();
    }

    xPositionOfYAxis() {
        return this.node.width - 4 * this.padding;
    }

    __drawAxisLines() {
        const { padding } = this;
        this.context.beginPath();

        const x = this.xPositionOfYAxis();
        this.context.fillStyle = 'rgba(135,135,135)';
        this.context.moveTo(x, padding);
        this.context.lineTo(x, this.node.height - padding);
        this.context.lineTo(padding, this.node.height - padding);

        this.context.stroke();
    }
}

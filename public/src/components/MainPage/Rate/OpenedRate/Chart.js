import { Component } from "../../../../modules/Softer/Softer";
import Styler from "../../../../modules/Styler";
import Canvas from "../../../../modules/Sancoft/Canvas";
import Point from "./Point";

export default class Chart extends Canvas {
    constructor(props) {
        super(props);

        this.hardCodeInit();
    }

    gen(n) {
        const res = [];
        for (let idx = 0; idx < n; idx++) {
            res.push(Math.random() * 100)
        }
        return res;
    }

    hardCodeInit() {
        this.props.X = {
            title: "time",
            values: this.gen(30)
        }

        this.props.Y = {
            title: "USD/RUB",
            values: this.gen(30)
        }

        this.props.minXInterval = undefined;
        this.props.YIntervales = 10;
        this.props.padding = 20;
    }

    draw() {
        this.context.clearRect(0, 0, this.node.width, this.node.height);

        this.__drawAxis();

        this.__drawChart()
    }

    __drawAxis() {
        this.__drawAxisLines();

        this.__drawXPoints([]);

        this.__drawYPoints();
    }

    __drawChart() {
        const {padding, Y} = this.props;
        const yFactor = this.__yFactor(Y.values);
        const xInterval = this.__xInterval();
        let currX = padding;
        const minY = Math.min(...Y.values);
        const lengthYAxis = this.node.height - 2*padding;
        const getY = value => padding + lengthYAxis * 0.05 + (lengthYAxis * 0.9 - (value - minY) * yFactor);
        for (let idx = 1; idx < Y.values.length; idx++) {
            const prev = getY(Y.values[idx - 1]);
            const curr = getY(Y.values[idx]);

            const point = new Point(currX, prev);
            this.drawObject(point);

            this.context.beginPath();
            this.context.moveTo(currX, prev);
            this.context.lineTo(currX + xInterval, curr);
            this.context.stroke();

            this.__drawPoint(currX + xInterval, curr);

            currX += xInterval;
        }
        this.context.stroke();
    }

    __drawXPoints(points) {
        const {padding} = this.props;
        const interval = this.__xInterval();
        for (let currX = padding; currX < this.node.width - padding ; currX += interval) {
            this.__drawPoint(currX, this.node.height - padding);
        }
    }

    __drawYPoints() {
        const {padding} = this.props;
        const interval = this.__yInterval();
        for (let currY = 2 * padding; currY < this.node.height - padding ; currY += interval) {
            this.__drawPoint(padding, currY);
        }
    }

    __xInterval() {
        const {padding, minXInterval, X} = this.props;
        const length = this.node.width - 3 * padding;
        const interval = length / (X.values.length - 1);
        return minXInterval ? interval < minXInterval ? interval : minXInterval : interval;
    }

    __yInterval() {
        const {padding, YIntervales} = this.props;
        const length = this.node.height - 3 * padding;
        return length / YIntervales;
    }

    __yFactor(values) {
        const {padding} = this.props;
        const length = this.node.height - 2 * padding;
        const max = Math.max(...values);
        const min = Math.min(...values);
        return length * 0.90 / (max - min) ;
    }

    __drawPoint(x, y) {
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.beginPath();
        this.context.arc(x, y, 2, 0, Math.PI * 2);
        this.context.fill()
    }

    __drawAxisLines() {
        const {padding} = this.props;
        this.context.beginPath();

        this.context.moveTo(padding, padding);
        this.context.lineTo(padding, this.node.height - padding);
        this.context.lineTo(this.node.width - padding, this.node.height - padding);

        this.context.stroke();
    }

    render() {
        this.hardCodeInit();
        return super.render();
    }
}

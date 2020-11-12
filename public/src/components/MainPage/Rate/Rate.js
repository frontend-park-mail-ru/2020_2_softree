import { Component } from '../../../modules/Softer/Softer.js';
import Styler from '../../../modules/Styler.js';
import './Rate.css';

export default class Rate extends Component {
    constructor(props) {
        super(props);
    }

    calc(left, right, multiply) {
        return ((right * multiply) / left).toFixed(3);
    }

    render() {
        const { props } = this;
        props.change = 1;
        const headerStyle = {
            background: props.change >= 0 ? '#60992D' : '#E71D36',
        };

        return this.create(`
        <div class="rate-card">
            <div class="rate-card__header" style="${Styler(headerStyle)}">
                <p class="rate-card__header_title">${props.base}/${props.title}</p> 
                <p class="rate-card__header_change">${props.change >= 0 ? `+${props.change}` : props.change}%</p> 
            </div> 
            <div class="rate-card__body">
                <div class="rate-card__body_field">
                    <p class="rate-card__body_field-title">BUY</p> 
                    <p class="rate-card__body_field-value">${this.calc(props.left, props.right, 1.0007)}</p> 
                </div> 
                <div class="rate-card__body_field">
                    <p class="rate-card__body_field-title">SELL</p> 
                    <p class="rate-card__body_field-value">${this.calc(props.left, props.right, 0.9993)}</p> 
                </div>
            </div>
        </div>`);
    }
}

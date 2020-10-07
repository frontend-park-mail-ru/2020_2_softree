import { Component } from '../../../modules/Softer/Softer.js';
import Styler from '../../../modules/Styler.js';

export default class Rate extends Component {
    constructor({ props, appId }) {
        super({ props, appId });
    }

    render() {
        const { props } = this;
        const headerStyle = {
            background: props.change >= 0 ? 'green' : 'red'
        };

        const [card] = this.create('div', `
        <div class="rate-card__header" style="${Styler(headerStyle)}">
            <p class="rate-card__header_title">${props.title}</p> 
            <p class="rate-card__header_change">${props.change >= 0 ? `+${props.change}` : props.change}%</p> 
        </div> 
        <div class="rate-card__body">
            <div class="rate-card__body_field">
                <p class="rate-card__body_field-title">BUY</p> 
                <p class="rate-card__body_field-value">${props.buy}</p> 
            </div> 
            <div class="rate-card__body_field">
                <p class="rate-card__body_field-title">SELL</p> 
                <p class="rate-card__body_field-value">${props.sell}</p> 
            </div>
        </div>
        `);

        card.className = 'rate-card';

        return card;
    }
}

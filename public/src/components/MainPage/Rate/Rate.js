import {Component} from "../../../modules/Softer/Softer.js";
import Styler from "../../../modules/Styler.js";

export default class Rate extends Component {
    constructor({props, appId}) {
        super({props, appId});
    }

    render() {
        const {props} = this;
        const headerStyle = {
            background: props.change >= 0 ? "green" : "red"
        };

        const [card] = this.create('div', `
        <div class="rate-card__header" style="${Styler(headerStyle)}">
            <p>${props.title}</p> 
            <p>${props.change}%</p> 
        </div> 
        <div class="rate-card__body">
            <div class="rate-card__body_field">
                <p>BUY</p> 
                <p>${props.buy}</p> 
            </div> 
            <div class="rate-card__body_field">
                <p>SELL</p> 
                <p>${props.sell}</p> 
            </div>
        </div>
        `)

        card.className = 'rate-card';

        return card;
    }
}

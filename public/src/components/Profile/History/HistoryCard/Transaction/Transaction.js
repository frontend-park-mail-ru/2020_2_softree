import { Component } from '../../../../../modules/Softer/Softer.js';
import './Transaction.scss';
import { flagStore } from '../../../../../utils/flagStore';
import Styler from '../../../../../modules/Styler';

export default class Rate extends Component {
    constructor(props) {
        super(props);
    }

    time(date) {
        return `${this.normalizeTimePart(date.getHours())}:${this.normalizeTimePart(date.getMinutes())}`;
    }

    normalizeTimePart(part) {
        if (part < 10) {
            return `0${part}`;
        }
        return part;
    }

    render() {
        const { props } = this;

        const date = new Date(props.updated_at.seconds * 1000);

        const style = {
            background: props.sell ? '#ffeaea' : '#f1fff1',
        };

        return this.create(`
        <div class="transaction" style="${Styler(style)}">
          <div class="transaction__title-wrapper">
            <div class="transaction__time">${this.time(date)}</div>
            <div class="transaction__rate">
              <img src="${flagStore[props.currency]}" alt="${props.currency}"/>
              <p>${props.currency}/${props.base}</p>
            </div>
          </div>
            
          <div class="transaction__amount">${props.amount}</div>
          <div class="transaction__action">${props.sell ? 'SELL' : 'BUY'}</div>
          <div class="transaction__wrapper">
            <div>${(props.value * props.amount).toFixed(3)}</div>
            <div class="transaction__price">
              <img src="${flagStore[props.base]}" alt="${props.base}">
              <p>${props.base}</p>  
            </div>
          </div>
        </div>`);
    }
}

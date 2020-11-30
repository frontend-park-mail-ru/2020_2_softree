import { Component } from '../../../../modules/Softer/Softer.js';
import './HistoryCard.scss';

export default class Rate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;

        const date = new Date(props.updated_at.seconds * 1000);

        return this.create(`
        <div class="history-card">
          <div class="history-card__rate">${props.currency}/${props.base}</div>
          <div class="history-card__amount">${props.amount}</div>
          <div class="history-card__value">${props.value}</div>
          <div class="history-card__action">${props.sell === "true" ? "SELL" : "BUY"}</div>
          <div class="history-card__date">${date.toLocaleString()}</div>
        </div>`);
    }
}

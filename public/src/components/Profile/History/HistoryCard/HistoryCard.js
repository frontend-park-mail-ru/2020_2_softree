import { Component } from '../../../../modules/Softer/Softer.js';
import './HistoryCard.scss';

export default class Rate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;

        return this.create(`
        <div class="history-card">
            <div class="history-card__header">
                <p class="history-card__time">${props.time}</p>
                <p class="history-card__date">${props.date}</p>
            </div>
            <div class="history-card__body">
                <div class="history-card__section">
                    <p>${props.from}</p>
                    <p style="font-size: 25px">☞</p>
                    <p>${props.to}</p>
                </div>
                <div class="history-card__section">
                    <p>Объем</p>
                    <p>${props.amount}</p>
                </div>
                <div class="history-card__section">
                    <p>Цена</p>
                    <p>${props.value}</p>
                </div>
            </div>
        </div>`);
    }
}

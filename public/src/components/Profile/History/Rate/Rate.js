import { Component } from '../../../../modules/Softer/Softer.js';
import './Rate.css';

export default class Rate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;

        return this.create(`
        <div class="history-card">
            <div class="history-card__header">
                <p class="history-card__header_time">${props.time}</p>
                <p class="history-card__header_date">${props.date}</p>
            </div>
            <div class="history-card__body">
                <div class="history-card__body_field">
                    <div class="history-card__body_field-title history-flexbox">
                        <p class="history-text">Валютная пара</p>
                        <p class="history-text">${props.title}</p>
                    </div>
                    <div class="history-card__body_field-action history-flexbox">
                        <p class="history-text">Действие</p>
                        <p class="history-text">${props.action}</p>
                    </div>
                    <div class="history-card__body_field-amount history-flexbox">
                        <p class="history-text">Объем</p>
                        <p class="history-text">${props.amount}</p>
                    </div>
                    <div class="history-card__body_field-commission history-flexbox">
                        <p class="history-text">Комиссия</p>
                        <p class="history-text">${props.commission}</p>
                    </div>
                </div>
            </div>
        </div>`);
    }
}

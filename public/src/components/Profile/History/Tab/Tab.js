import { Component } from '../../../../modules/Softer/Softer.js';
import './Tab.css';

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
                        <p class="history-text">${props.from}</p>
                        <p class="history-text" style="font-size: 25px">☞</p>
                        <p class="history-text">${props.to}</p>
                    </div>
                    <div class="history-card__body_field-amount history-flexbox">
                        <p class="history-text">Объем</p>
                        <p class="history-text">${props.amount}</p>
                    </div>
                    <div class="history-card__body_field-amount history-flexbox">
                        <p class="history-text">Цена</p>
                        <p class="history-text">${props.value}</p>
                    </div>
                </div>
            </div>
        </div>`);
    }
}

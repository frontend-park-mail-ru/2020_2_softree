import { Component } from '../../../modules/Softer/Softer.js';
import Rates from '../../MainPage/Rate/Rate.js';

import './Bag.css';

export default class Bag extends Component {
    constructor() {
        super();
    }

    initState() {
        return {
            rates: [
                {
                    title: 'USD',
                    change: -1,
                    buy: '50.00',
                    sell: '34.00',
                },
                {
                    title: 'RUB',
                    change: 1,
                    buy: '50.00',
                    sell: '34.00',
                },
            ],
        };
    }

    render() {
        return this.create(
            `
            <div class="container">
                <h2 class='block-title'>Счет</h2>
                    <div class='bag-info__container'>
                        <div class='bag-info amount-info'>
                            <p>На счету</p>
                            <p>400 000</p>
                        </div>
                        <div class='bag-info summary-info'>
                            <p>Доход за все время</p>
                            <p style='color: green'>22 000 (+5%)</p>
                        </div>
                        <div class='bag-info refill-info'>
                            <p>Пополнения</p>
                            <p>100 000</p>
                        </div>
                        <div class='bag-info decrease-info'>
                            <p>Выведено</p>
                            <p>200 000</p>
                        </div>
                    </div>
                <h2 class='block-title'>Валюта</h2>
                <div class='rates-wrapper'>
                    ${this.state.rates.length === 0 ? '<h1>Котировки подгружаются...</h1>' : '<Rates></Rates>'}
                </div>
            </div>
            `,
            {
                Rates: [Rates, this.state.rates],
            },
        );
    }
}

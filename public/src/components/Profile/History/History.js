import { Component } from '../../../modules/Softer/Softer.js';
import Rate from './Rate/Rate.js';

export default class History extends Component {
    constructor() {
        super();

        this.interval = false;
    }

    initState() {
        return {
            rates: [
                {
                    time: '13:50',
                    date: '24.08.2020',
                    title: 'USD/RUB',
                    action: 'SELL',
                    amount: '2000',
                    commission: '56',
                    profit: '+500',
                },
                {
                    time: '13:50',
                    date: '24.08.2020',
                    title: 'USD/RUB',
                    action: 'SELL',
                    amount: '2000',
                    commission: '56',
                    profit: '+500',
                },
            ],
        };
    }

    clear() {
        super.clear();
        clearInterval(this.interval);
    }

    render() {
        return this.create(
            `
        <div class="container">
            <h2 class='block-title'>История</h2>
            <div class='rates-wrapper'>
                ${this.state.rates.length === 0 ? '<h1>Котировки подгружаются...</h1>' : '<Rates></Rates>'}
            </div>
        </div>
        `,
            {
                Rates: [Rate, this.state.rates],
            },
        );
    }
}

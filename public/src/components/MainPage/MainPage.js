import { Component } from '../../modules/Softer/Softer.js';
import Rate from './Rate/Rate.js';
import { jget } from '../../modules/jfetch.js';
import { apiRates } from '../../api.js';
import './MainPage.css';

export default class MainPage extends Component {
    constructor() {
        super();

        this.interval = false;
        this.doNotReset = true;
    }

    initState() {
        return { rates: [] };
    }

    fetchRates() {
        jget(apiRates())
            .then(({ data }) => {
                this.setState({ rates: data });
            })
            .catch(() => {
                this.setState({ error: 'Что-то пошло не так(' });
            });
    }

    clear() {
        super.clear();
        clearInterval(this.interval);
        this.interval = null;
    }

    subscribe() {
        if (this.interval) {
            return;
        }
        if (this.useSelector(store => store.user.userData)) {
            this.fetchRates();
            this.interval = setInterval(() => this.fetchRates(), 2000);
        }
    }

    render() {
        this.subscribe();

        return this.create(
            `
        <div class="container">
            <h2 class='block-title'>Валюта</h2>
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

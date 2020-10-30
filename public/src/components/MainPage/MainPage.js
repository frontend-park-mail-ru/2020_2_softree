import { Component } from '../../modules/Softer/Softer.js';
import Rate from './Rate/Rate.js';
import { jget } from '../../modules/jfetch.js';
import { apiRates } from '../../api.js';

export default class MainPage extends Component {
    constructor() {
        super();

        this.state = {
            rates: [],
        };

        this.interval = false;
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
    }

    render() {
        if (!this.interval) {
            if (this.useSelector(store => store.user.userData)) {
                this.fetchRates();
                this.interval = setInterval(() => this.fetchRates(), 2000);
            }
        }

        return this.create(
            `
        <div class="container">
            <h2 class='block-title'>Валюты</h2>
            <div class='rates-wrapper'>
                ${
                    this.state.rates.length === 0
                        ? '<h1>Котировки подгружаются...</h1>'
                        : '<Rates></Rates>'
                }
            </div> 
        </div>
        `,
            {
                Rates: [Rate, this.state.rates],
            },
        );
    }
}

import {Component} from "../../modules/Softer/Softer.js";
import Rate from "./Rate/Rate.js";
import {jget} from "../../modules/jfetch.js";
import {apiRates} from "../../api.js";

export default class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rates: []
        }
        this.rates = [
            {title: "USD/RUB", change: 1.25, sell: 72.345, buy: 73.284},
            {title: "EUR/RUB", change: 2.31, sell: 82.345, buy: 83.284},
            {title: "USD/EUR", change: -0.15, sell: 62.345, buy: 63.284},
            {title: "CAD/RUB", change: 0.31, sell: 12.345, buy: 13.284},
            {title: "AUD/RUB", change: -1.24, sell: 32.345, buy: 33.284},
        ]

        this.interval = false;
    }

    fetchRates() {
        jget(apiRates())
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => this.setState({rates: data}));
                } else {
                    this.setState({error: "Что-то пошло не так("});
                }
            })
    }

    render() {
        if (!this.interval) {
            if (this.useSelector(store => store.user.userData)) {
                this.fetchRates();
                this.interval = setInterval(() => this.fetchRates(), 5000);
            }
        }

        const [page, replace] = this.create('div', `
        <h2 class="block-title">Валюты</h2>
        <div class="rates-wrapper">
            ${this.state.rates.length === 0 ? `<h1>Котировки подгружаются...</h1>` : `<Rates></Rates>`}
        </div>
        `)

        if (this.state.rates.length !== 0) {
            replace({
                Rates: this.state.rates.map( rate => new Rate({props: rate}).render())
            })
        }

        return page;
    }
}

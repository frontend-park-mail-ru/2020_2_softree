import {Component} from "../../modules/Softer/Softer.js";
import Rate from "./Rate/Rate.js";

export default class MainPage extends Component {

    constructor(props) {
        super(props);

        this.rates = [
            {title: "USD/RUB", change: 1.25, sell: 72.345, buy: 73.284},
            {title: "EUR/RUB", change: 2.31, sell: 82.345, buy: 83.284},
            {title: "USD/EUR", change: -0.15, sell: 62.345, buy: 63.284},
            {title: "CAD/RUB", change: 0.31, sell: 12.345, buy: 13.284},
            {title: "AUD/RUB", change: -1.24, sell: 32.345, buy: 33.284},
        ]
    }

    render() {
        const [page, replace] = this.create('div', `
        <h2 class="block-title">Валюты</h2>
        <div class="rates-wrapper">
            <Rates></Rates>
        </div>
        `)

        replace({
            Rates: this.rates.map( rate => new Rate({props: rate}).render())
        })

        return page;
    }
}

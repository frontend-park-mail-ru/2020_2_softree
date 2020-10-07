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
                this.interval = setInterval(() => this.fetchRates(), 2000);
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

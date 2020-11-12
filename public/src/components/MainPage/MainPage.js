import { Component } from '../../modules/Softer/Softer.js';
import Rate from './Rate/Rate.js';
import { jget } from '../../modules/jfetch.js';
import { apiMarkets, apiRates } from '../../api.js';
import './MainPage.css';
import { useDispatch } from '../../modules/Softer/softer-softex';
import { fetchMarkets, setMarkets } from '../../store/actions';

export default class MainPage extends Component {
    constructor() {
        super();

        this.doNotReset = true;
        this.fetched = false;
        this.fetchMarkets();
    }

    fetchMarkets() {
        if (this.fetched) {
            return;
        }
        this.fetched = true;
        const dispatch = useDispatch();
        jget(apiMarkets()).then(resp => {
            dispatch(setMarkets(resp.data));
        });
    }

    render() {
        const markets = this.useSelector(store => store.markets);
        const currency = this.useSelector(store => store.currency);

        return this.create(
            `
        <div class="container">
            <h2 class='block-title'>Котировки</h2>
            <div class='rates-wrapper'>
                ${markets.length === 0 ? '<h1>Котировки подгружаются...</h1>' : '<Rates></Rates>'}
            </div>
        </div>
        `,
            {
                Rates: [
                    Rate,
                    markets.map(market => ({
                        ...market,
                        left: currency[market.base].value,
                        right: currency[market.title].value,
                    })),
                ],
            },
        );
    }
}

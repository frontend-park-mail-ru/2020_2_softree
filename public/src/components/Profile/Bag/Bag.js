import { Component } from '../../../modules/Softer/Softer.js';
import { apiUserAccounts } from '../../../api.js';
import { setUserAccount } from '../../../store/actions.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import Currency from './Currency.js';
import { jget } from '../../../modules/jfetch.js';

import './Bag.css';

export default class Bag extends Component {
    constructor() {
        super();
        this.total = -1;

        this.fetchAccounts();
        this.getTotal();
    }

    fetchAccounts() {
        const dispatch = useDispatch();
        jget(apiUserAccounts()).then(resp => {
            dispatch(setUserAccount(resp.data));
        });
    }

    getTotal() {
        const currencies = this.useSelector(store => store.user.accounts);
        
        currencies.forEach(element => {
            
        });
    }

    calc(currencyStore) {
        return (currencyStore[this.state.rightCurrency].value / currencyStore[this.state.leftCurrency].value).toFixed(
            3,
        );
    }

    render() {
        const currencies = this.useSelector(store => store.user.accounts);
        return this.create(
            `
            <div class="container">
                <h2 class='block-title'>Счет</h2>
                    <div class='bag-info__container'>
                        <p>ВСЕГО</p>
                        <p>${this.total < 0 ? '' : this.total}</p>
                    </div>
                <h2 class='block-title'>Валюта</h2>
                <div>
                    ${currencies.length === 0 ? '<h1>Валюты подгружаются...</h1>' : '<Currency></Currency>'}
                </div>
            </div>
            `,
            {
                Currency: [
                    Currency,
                    currencies.map((element, idx) => ({
                        ...element,
                        key: idx,
                        value: parseFloat(element.value).toFixed(2),
                    })),
                ],
            },
        );
    }
}

import { Component } from '../../../modules/Softer/Softer.js';
import { apiUserAccounts } from '../../../api.js';
import { setUserAccount } from '../../../store/actions.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import Currency from './Currency.js';
import { jget } from '../../../modules/jfetch.js';

import './Bag.scss';
import { select } from '../../../modules/Softer/softer-softex';

export default class Bag extends Component {
    constructor() {
        super();

        this.fetchAccounts();
    }

    fetchAccounts() {
        const dispatch = useDispatch();
        jget(apiUserAccounts()).then(resp => {
            dispatch(setUserAccount(resp.data));
        });
    }

    getTotal(accounts) {
        const currencyStore = select(store => store.currency);
        let sum = 0;
        accounts.forEach(account => {
            sum += this.calc(currencyStore, account.title, 'RUB') * account.value;
        });
        return sum.toFixed(3);
    }

    calc(currencyStore, from, to) {
        return (currencyStore[to].value / currencyStore[from].value).toFixed(3);
    }

    render() {
        const currencies = this.useSelector(store => store.user.accounts);
        const total = this.getTotal(currencies);

        return this.create(
            `
            <div class="container bag">
                <h2 class='bag__title'>Счет</h2>
                    <div class='bag__info'>
                        <p>ВСЕГО</p>
                        <p>${total} ₽</p>
                    </div>
                <h2 class='bag__title'>Валюта</h2>
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
                        value: (+element.value).toFixed(3),
                    })),
                ],
            },
        );
    }
}

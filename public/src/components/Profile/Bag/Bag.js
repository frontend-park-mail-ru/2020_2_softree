import { Component } from '../../../modules/Softer/Softer.js';
import { apiUserAccounts } from '../../../api.js';
import { setUserAccount } from '../../../store/actions.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import Account from './Account/Account.js';
import { jget } from '../../../modules/jfetch.js';
import ActionButton from '../../UI/ActionButton/ActionButton.js';

import './Bag.scss';
import { select } from '../../../modules/Softer/softer-softex';
import Statistic from './Statistic/Statistic';

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
            sum += this.calc(currencyStore, account.title, 'RUB') * (account.value || 0);
        });
        return sum;
    }

    calc(currencyStore, from, to) {
        if (!currencyStore[to].value || !currencyStore[from].value) {
            return 0;
        }
        return currencyStore[to].value / currencyStore[from].value;
    }

    render() {
        const accounts = this.useSelector(store => store.user.accounts);
        const total = this.getTotal(accounts);
        const income = -3;

        return this.create(
            `
            <div class="container bag">
                <h2 class='bag__title'>Счет</h2>
                    <div class='bag__info'>
                        <p>ВСЕГО</p>
                        <p>${total.toFixed(3)} ₽</p>
                    </div>
                <h2 class='bag__title'>Статистика</h2>
                  <Statistic/>
                <h2 class='bag__title'>Валюта</h2>
                <div class="accounts-wrapper">
                    ${accounts.length === 0 ? '<h1>Валюты подгружаются...</h1>' : '<Account/>'}
                </div>
            </div>
            `,
            {
                Account: [
                    Account,
                    accounts.map((element, idx) => ({
                        ...element,
                        key: idx,
                        value: element.value ? element.value.toFixed(3) : 0,
                    })),
                ],
                Statistic,
            },
        );
    }
}

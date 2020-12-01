import { Component } from '../../../modules/Softer/Softer.js';
import { apiUserAccounts } from '../../../api.js';
import { setUserAccount } from '../../../store/actions.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import Currency from './Currency/Currency.js';
import { jget } from '../../../modules/jfetch.js';
import ActionButton from '../../UI/ActionButton/ActionButton.js';

import './Bag.scss';
import { select } from '../../../modules/Softer/softer-softex';

export default class Bag extends Component {
    constructor() {
        super();

        this.fetchAccounts();
        this.buttons = [
            {
                content: '1г',
                isPushed: () => window.location.pathname === '/profile',
                clb: () => this.redirect(...pageProfile()),
            },
            {
                content: '1м',
                isPushed: () => window.location.pathname === '/profile/history',
                clb: () => this.redirect(...pageHistory()),
            },
            {
                content: '1д',
                isPushed: () => window.location.pathname === '/profile/history',
                clb: () => this.redirect(...pageHistory()),
            },
        ];
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
        return sum.toFixed(3);
    }

    calc(currencyStore, from, to) {
        if (!currencyStore[to].value || !currencyStore[from].value) {
            return 0;
        }
        return (currencyStore[to].value / currencyStore[from].value).toFixed(3);
    }

    render() {
        const currencies = this.useSelector(store => store.user.accounts);
        const total = this.getTotal(currencies);
        const income = -3;

        return this.create(
            `
            <div class="container bag">
                <h2 class='bag__title'>Счет</h2>
                    <div class='bag__info'>
                        <p>ВСЕГО</p>
                        <p>${total} ₽</p>
                    </div>
                <h2 class='bag__title'>Статистика</h2>
                    <div class='bag__info'>
                        <p>ДОХОД</p>
                        <p>${income} ₽</p>
                    </div>
                    <div class="period__selector">
                        <PeriodSelector/>
                    </div>
                <h2 class='bag__title'>Валюта</h2>
                <div class="accounts-wrapper">
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
                        value: element.value ? (+element.value).toFixed(3) : 0,
                    })),
                ],
                PeriodSelector: [ActionButton, this.buttons.map((button, idx) => ({ ...button, key: idx }))],
            },
        );
    }
}

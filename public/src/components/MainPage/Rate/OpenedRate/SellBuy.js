import { Component } from "../../../../modules/Softer/Softer";
import { useDispatch } from "../../../../modules/Softer/softer-softex";
import { jget, jpost } from "../../../../modules/jfetch";
import { apiHistory, apiUserAccounts } from "../../../../api";
import { dropUserData, setUserAccount, setUserHistory, showMessage } from "../../../../store/actions";
import { msgTypes } from "../../../../messages/types";
import { pageSignUp } from "../../../../pages";

export default class SellBuy extends Component {
    constructor(props) {
        super(props);
    }

    fetchAccounts() {
        const dispatch = useDispatch();
        jget(apiUserAccounts()).then(resp => {
            dispatch(setUserAccount(resp.data));
        });
    }

    fetchHistory() {
        const dispatch = useDispatch();
        jget(apiHistory()).then(resp => {
            dispatch(setUserHistory(resp.data));
        });
    }

    action(action, accountValue = 0) {
        let currency = this.props.base;
        let base = this.props.currency;
        const amount = +document.querySelector('#rate-amount-input').value;

        if (amount <= 0) {
            useDispatch()(showMessage(`Недопустимое значение ${amount}`, msgTypes.FAIL));
            return;
        }

        if (amount > accountValue && action === 'sell') {
            useDispatch()(showMessage(`У вас недостаточно ${currency} для совершения сделки на ${amount} ${currency}`, msgTypes.FAIL));
            return;
        }

        jpost(apiHistory(), { base, currency, amount, sell: action === 'sell' })
            .then(resp => {
                useDispatch()(showMessage('Успешно!', msgTypes.SUCCESS));
                this.fetchAccounts();
                this.fetchHistory();
            })
            .catch(resp => {
                const dispatch = useDispatch();
                if (resp.status === 401) {
                    dispatch(showMessage('Нет авторизации :(', msgTypes.FAIL));
                    dispatch(dropUserData());
                    this.redirect(...pageSignUp());
                } else {
                    useDispatch()(showMessage(`У вас недостаточно ${base} для совершения сделки на ${amount} ${currency}`, msgTypes.FAIL));
                }
            });

        this.setData({ amount });
    }

    findAccountValue(accountStore, currency) {
        const found = accountStore.filter(account => account.title === currency);
        if (found.length === 0) {
            return 0;
        }
        return found[0].value.toFixed(3);
    }

    render() {
        const {currency, base} = this.props;

        const accounts = this.useSelector(store => store.user.accounts);
        if (accounts.length === 0) {
            this.fetchAccounts();
        }
        const baseValue = this.findAccountValue(accounts, base);
        const currencyValue = this.findAccountValue(accounts, currency);


        const element = this.create(`
        <div>
          <input class="opened-rate__amount-input"
               id="rate-amount-input"
               value="${this.data.amount}"
               name="amount"
               type="number"
               placeholder="Введите сумму"/>
          <div class="opened-rate__control-panel">
            <div class="opened-rate__btn-wrapper buy">
              <p class="opened-rate__available">Доступно: ${currencyValue} ${currency}</p>
              <div class="opened-rate__btn buy">Купить ${base}</div>
            </div>
            <div class="opened-rate__btn-wrapper sell">
              <p class="opened-rate__available">Доступно: ${baseValue} ${base}</p>
              <div class="opened-rate__btn sell">Продать ${base}</div>
            </div>
          </div>
        </div>
        `);

        this.listen('.opened-rate__btn.buy', 'click', () => this.action.bind(this)('buy'));
        this.listen('.opened-rate__btn.sell', 'click', () => this.action.bind(this)('sell', baseValue));

        return element;
    }
}

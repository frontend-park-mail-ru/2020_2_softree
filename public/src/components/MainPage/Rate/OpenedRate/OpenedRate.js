import './OpenedRate.css';
import { Component } from '../../../../modules/Softer/Softer';
import close from '../../../../images/close.svg';
import { changeHandler } from '../../../../utils/utils';
import { apiHistory, apiTransactions, apiUserAccounts } from "../../../../api";
import { useDispatch } from '../../../../modules/Softer/softer-softex';
import { dropUserData, setUserAccount, setUserHistory, showMessage } from "../../../../store/actions";
import { msgTypes } from '../../../../messages/types';
import { jget, jpost } from "../../../../modules/jfetch";
import { pageSignUp } from '../../../../pages';

export default class OpenedRate extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    initData() {
        return {
            amount: '',
        };
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

    action(action) {
        let from = this.props.base;
        let to = this.props.currency;
        if (action === 'buy') {
            from = this.props.currency;
            to = this.props.base;
        }
        const amount = +document.querySelector('#rate-amount-input').value;
        this.setData({amount});

        jpost(apiTransactions(), { from, to, amount })
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
                    dispatch(showMessage('Недостаточно средств' + ' для совершения операции :(', msgTypes.FAIL));
                }
            });
    }

    render() {
        const { base, currency, toggle } = this.props;

        const element = this.create(`
    <div class="wrapper">
      <div class="opened-rate"> 
        <header class="opened-rate__header">
          <h2>${base}/${currency}</h2> 
          <img src="${close}" class="opened-rate__close-btn" alt="close"/>
        </header>
        <div class="opened-rate__chart">График</div>
        <input class="opened-rate__amount-input"
               id="rate-amount-input"
               value="${this.data.amount}"
               name="amount"
               type="number"
               placeholder="Введите сумму"/>
        <div class="opened-rate__control-panel">
           <div class="opened-rate__btn buy">BUY</div>
           <div class="opened-rate__btn sell">SELL</div>
        </div>
      </div> 
    </div>
    `);

        this.listen('.opened-rate__amount-input', 'keydown', e => {
            changeHandler(e, this.setData.bind(this));
        });

        this.listen('.opened-rate', 'click', e => e.stopPropagation());
        this.listen('.opened-rate__close-btn', 'click', toggle);

        this.listen('.opened-rate__btn.buy', 'click', () => this.action.bind(this)('buy'));
        this.listen('.opened-rate__btn.sell', 'click', () => this.action.bind(this)('sell'));

        return element;
    }
}

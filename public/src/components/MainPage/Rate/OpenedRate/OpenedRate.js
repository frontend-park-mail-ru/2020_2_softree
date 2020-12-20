import './OpenedRate.scss';
import { Component } from '../../../../modules/Softer/Softer';
import close from '../../../../images/close.svg';
import { changeHandler } from '../../../../utils/utils';
import { apiHistory, apiRatesPeriod, apiTransactions, apiUserAccounts } from "../../../../api";
import { useDispatch } from '../../../../modules/Softer/softer-softex';
import { dropUserData, setUserAccount, setUserHistory, showMessage } from '../../../../store/actions';
import { msgTypes } from '../../../../messages/types';
import { jget, jpost } from '../../../../modules/jfetch';
import { pageSignUp } from '../../../../pages';
import Chart from "./Chart";
import ActionButton from "../../../UI/ActionButton/ActionButton";

export default class OpenedRate extends Component {
    constructor(props) {
        super(props);

        this.buttons = [
            {
                content: 'день',
                isPushed: () => this.state.chartPeriod === 'day',
                clb: () => this.fetchRateHistory('day'),
            },
            {
                content: 'неделю',
                isPushed: () => this.state.chartPeriod === 'week',
                clb: () => this.fetchRateHistory('week'),
            },
            {
                content: 'месяц',
                isPushed: () => this.state.chartPeriod === 'month',
                clb: () => this.fetchRateHistory('month'),
            },
            {
                content: 'год',
                isPushed: () => this.state.chartPeriod === 'year',
                clb: () => this.fetchRateHistory('year'),
            },
        ];


        this.doNotReset = true;
        this.fetchRateHistory('day').then(resp => {
            console.log("fetched");
        });
    }

    initData() {
        return {
            amount: '',
        };
    }

    initState() {
        return {
            chartPeriod: 'day',
            currencyValues: [],
            baseValues: [],
        }
    }

    async fetchRateHistory(period) {
        this.setState({fetched: false});
        const currencyResp = await jget(apiRatesPeriod(this.props.base, period));
        const baseResp = await jget(apiRatesPeriod(this.props.currency, period));
        this.setState({
            chartPeriod: period,
            currencyValues: currencyResp.data,
            baseValues: baseResp.data,
            fetched: true,
        })
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
        let currency = this.props.base;
        let base = this.props.currency;
        const amount = +document.querySelector('#rate-amount-input').value;
        this.setData({ amount });

        jpost(apiTransactions(), { base, currency, amount, sell: action === 'sell'})
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

    calc(base, currency) {
        return (base / currency);
    }

    render() {
        const { base, currency, toggle } = this.props;
        const currencyStore = this.useSelector(store => store.currency);
        const xValues = [];
        const yValues = [];
        if (this.state.fetched) {
            this.state.baseValues.forEach((curr, idx) => {
                if (this.props.base === "USD") {
                    yValues.push(+curr.value)
                } else {
                    yValues.push(this.calc(+this.state.currencyValues[idx].value, +curr.value));
                }
                xValues.push(curr.updated_at.seconds * 1000);
            });
        }

        const element = this.create(`
    <div class="wrapper">
      <div class="opened-rate"> 
        <header class="opened-rate__header">
          <h2>${base}/${currency}</h2> 
          <img src="${close}" class="opened-rate__close-btn" alt="close"/>
        </header>
        <div class="opened-rate__chart-wrapper">
          <div class="opened-rate__period-choice-wrapper">
            <PeriodChoice/>
          </div>
          <div class="opened-rate__chart">
            ${this.state.fetched ? `<Chart/>` : `Загрузка...` }
          </div>
        </div>
        <input class="opened-rate__amount-input"
               id="rate-amount-input"
               value="${this.data.amount}"
               name="amount"
               type="number"
               placeholder="Введите сумму"/>
        <div class="opened-rate__control-panel">
           <div class="opened-rate__btn buy">Купить</div>
           <div class="opened-rate__btn sell">Продать</div>
        </div>
      </div> 
    </div>
    `, {
            Chart: [Chart, {X: {values: xValues}, Y: {values: yValues}, period: this.state.chartPeriod}],
            PeriodChoice: [ActionButton, this.buttons.map((button, idx) => ({ ...button, key: idx }))]
        });

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

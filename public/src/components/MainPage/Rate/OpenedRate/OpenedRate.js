import './OpenedRate.scss';
import { Component } from '../../../../modules/Softer/Softer';
import close from '../../../../images/close.svg';
import { changeHandler } from '../../../../utils/utils';
import { apiHistory, apiRatesPeriod, apiUserAccounts } from '../../../../api';
import { useDispatch } from '../../../../modules/Softer/softer-softex';
import { dropUserData, setUserAccount, setUserHistory, showMessage } from '../../../../store/actions';
import { msgTypes } from '../../../../messages/types';
import { jget, jpost } from '../../../../modules/jfetch';
import { pageSignUp } from '../../../../pages';
import Chart from './Chart';
import ActionButton from '../../../UI/ActionButton/ActionButton';
import SellBuy from './SellBuy';

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
        this.fetchRateHistory('day').then(resp => {});
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
        };
    }

    async fetchRateHistory(period) {
        this.setState({
            fetched: false,
            chartPeriod: period,
        });
        const currencyResp = await jget(apiRatesPeriod(this.props.base, period));
        const baseResp = await jget(apiRatesPeriod(this.props.currency, period));
        this.setState({
            currencyValues: currencyResp.data,
            baseValues: baseResp.data,
            fetched: true,
        });
    }

    calc(base, currency) {
        return currency / base;
    }

    render() {
        const { base, currency, toggle } = this.props;
        const xValues = [];
        const yValues = [];

        if (this.state.fetched) {
            this.state.baseValues.forEach((curr, idx) => {
                if (this.props.base === 'USD') {
                    yValues.push(+curr.value);
                } else {
                    yValues.push(this.calc(+this.state.currencyValues[idx].value, +curr.value));
                }
                xValues.push(curr.updated_at.seconds * 1000);
            });
        }

        const element = this.create(
            `
    <div class="wrapper">
      <div class="opened-rate"> 
        <header class="opened-rate__header">
          <h2>${base}/${currency}</h2> 
          <img src="${close}" class="opened-rate__close-btn" alt="close"/>
        </header>
        <div class="opened-rate__content">
          <div class="opened-rate__chart-wrapper">
            <div class="opened-rate__period-choice-wrapper">
              <PeriodChoice/>
            </div>
            <div class="opened-rate__chart">
              ${this.state.fetched ? `<Chart/>` : `Загрузка...`}
            </div>
          </div>
          <SellBuy/> 
        </div>
      </div> 
    </div>
    `,
            {
                Chart: [Chart, { X: { values: xValues }, Y: { values: yValues }, period: this.state.chartPeriod }],
                PeriodChoice: [ActionButton, this.buttons.map((button, idx) => ({ ...button, key: idx }))],
                SellBuy: [SellBuy, { currency, base }],
            },
        );

        this.listen('.opened-rate__amount-input', 'keydown', e => {
            changeHandler(e, this.setData.bind(this));
        });

        this.listen('.opened-rate', 'click', e => e.stopPropagation());
        this.listen('.opened-rate__close-btn', 'click', toggle);

        return element;
    }
}

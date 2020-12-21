import { Component } from '../../../../modules/Softer/Softer';
import { apiHistory, apiIncome, apiPeriodTransactions, apiUserAccountsHistory } from '../../../../api';
import { useDispatch } from '../../../../modules/Softer/softer-softex';
import { showMessage } from '../../../../store/actions';
import { msgTypes } from '../../../../messages/types';
import { jget } from '../../../../modules/jfetch';
import ActionButton from '../../../UI/ActionButton/ActionButton';
import { calc } from '../../../../utils/utils';
import Chart from '../../../MainPage/Rate/OpenedRate/Chart';
import './Statistic.scss';
import ProfileChart from './ProfileChart';

export default class Statistic extends Component {
    constructor(props) {
        super(props);

        this.buttons = [
            {
                content: 'неделя',
                isPushed: () => this.state.interest === 'week',
                clb: () => this.fetchIncome('week'),
            },
            {
                content: 'месяц',
                isPushed: () => this.state.interest === 'month',
                clb: () => this.fetchIncome('month'),
            },
            {
                content: 'год',
                isPushed: () => this.state.interest === 'year',
                clb: () => this.fetchIncome('year'),
            },
        ];

        this.fetchIncome('week');
        this.doNotReset = true;
    }

    initState() {
        return {
            interest: 'day',
            income: 0,
            history: [],
            transactions: [],
        };
    }

    fetchIncome(period, rerender = true) {
        if (!rerender) {
            return;
        }

        let state = { interest: period };
        jget(apiUserAccountsHistory(period)).then(resp => {
            state = { ...state, history: resp.data, loading: false };
            jget(apiPeriodTransactions(period)).then(resp => {
                this.setState({ ...state, transactions: resp.data });
            });
        });
    }

    render() {
        const xValues = [];
        const yValues = [];

        this.state.history.forEach(history => {
            xValues.push(history.updated_at.seconds * 1000);
            yValues.push(calc('USD', 'RUB', history.value));
        });

        let income;
        if (xValues.length > 0) {
            income = yValues.slice(-1)[0] - yValues[0];
        } else {
            income = 0;
        }

        const el = this.create(
            `
        <div class="statistic">
          <div class='bag__comes'>
            <p class="title">Доход:</p>
            <p>${income.toFixed(3)} ₽</p>
          </div>
          <div class="statistic__chart">
            ${xValues.length < 2 || yValues.length < 2 ? 'Данных нет :(' : '<Chart/>'}
          </div>
          <div class="period__selector">
            <PeriodSelector/>
          </div>
        </div>
        `,
            {
                PeriodSelector: [ActionButton, this.buttons.map((button, idx) => ({ ...button, key: idx }))],
                Chart: [
                    ProfileChart,
                    {
                        X: { values: xValues },
                        Y: { values: yValues },
                        period: this.state.interest,
                        transactions: this.state.transactions,
                    },
                ],
            },
        );

        return el;
    }
}

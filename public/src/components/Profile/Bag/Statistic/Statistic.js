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
                content: 'день',
                isPushed: () => this.state.interest === 'day',
                clb: () => this.fetchIncome('day'),
            },
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

        this.fetchIncome('day');
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
        jget(apiIncome(period))
            .then(resp => {
                if (rerender) {
                    this.setState({ interest: period, income: resp.data, loading: true });
                    let state = {};
                    jget(apiUserAccountsHistory(period)).then(resp => {
                        state = { history: resp.data, loading: false };
                        jget(apiPeriodTransactions(period)).then(resp => {
                            this.setState({ ...state, transactions: resp.data });
                        });
                    });

                    return;
                }
                return resp.data;
            })
            .catch(resp => {
                useDispatch()(showMessage('Не удалось получить данные', msgTypes.FAIL));
            });
    }

    render() {
        const xValues = [];
        const yValues = [];

        this.state.history.forEach(history => {
            xValues.push(history.updated_at.seconds * 1000);
            yValues.push(history.value);
        });

        const el = this.create(
            `
        <div class="statistic">
          <div class='bag__comes'>
            <p class="title">Доход:</p>
            <p>${calc('USD', 'RUB', this.state.income || 0).toFixed(3)} ₽</p>
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

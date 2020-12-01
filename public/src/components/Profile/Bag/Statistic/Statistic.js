import { Component } from "../../../../modules/Softer/Softer";
import { apiIncome } from "../../../../api";
import { useDispatch } from "../../../../modules/Softer/softer-softex";
import { showMessage } from "../../../../store/actions";
import { msgTypes } from "../../../../messages/types";
import { jget } from "../../../../modules/jfetch";
import ActionButton from "../../../UI/ActionButton/ActionButton";


export default class Statistic extends Component {
    constructor() {
        super();

        this.buttons = [
            {
                content: '1д',
                isPushed: () => this.state.interest === 'day',
                clb: () => this.fetchIncome('day'),
            },
            {
                content: '1н',
                isPushed: () => this.state.interest === 'week',
                clb: () => this.fetchIncome("week"),
            },
            {
                content: '1м',
                isPushed: () => this.state.interest === 'month',
                clb: () => this.fetchIncome('month'),
            },
            {
                content: '1г',
                isPushed: () => this.state.interest === 'year',
                clb: () => this.fetchIncome('year'),
            },
        ];

        this.fetchIncome('day')
    }


    initState() {
        return {
            interest: 'day',
            income: 0
        };
    }

    fetchIncome(period) {
        jget(apiIncome(period))
            .then(resp => {
                this.setState({interest: period, income: resp.data})
            })
            .catch(resp => {
                useDispatch()(showMessage("Не удалось получить данные", msgTypes.FAIL));
            })
    }

    render() {
        const el = this.create(`
        <div class="statistic">
          <div class='bag__info'>
            <p>ДОХОД</p>
            <p>${this.state.income} ₽</p>
          </div>
          <div class="period__selector">
            <PeriodSelector/>
          </div>
        </div>
        `, {
            PeriodSelector: [ActionButton, this.buttons.map((button, idx) => ({ ...button, key: idx }))],
        });

        return el;
    }
}

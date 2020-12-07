import { Component } from '../../../modules/Softer/Softer.js';
import { apiHistory } from '../../../api.js';
import { setUserHistory } from '../../../store/actions.js';
import { jget } from '../../../modules/jfetch.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import Styler from '../../../modules/Styler';
import HistoryCard from './HistoryCard/HistoryCard';

import './History.scss';

export default class History extends Component {
    constructor() {
        super();
        this.isFetched = false;
        this.fetchHistory();
    }

    fetchHistory() {
        this.isFetched = true;
        const dispatch = useDispatch();
        jget(apiHistory()).then(resp => {
            dispatch(setUserHistory(resp.data.history));
        });
    }

    resolve(histories) {
        const style = {
            color: 'gray',
        };
        if (!this.isFetched) {
            return `<h3 style="${Styler(style)}">История подгружается...</h3>`;
        }
        if (!histories) {
            return `<h3 style="${Styler(style)}">Вы еще не совершали операций :(</h3>`;
        } else {
            return '<HistoryCards/>';
        }
    }

    compose(histories) {
        if (!histories || histories.length === 0) {
            return [];
        }

        const result = [];
        let prevDate = new Date(histories[0].updated_at.seconds * 1000).toLocaleString().split(',')[0];
        result.push({ date: prevDate, transactions: [histories[0]] });

        for (let idx = 1; idx < histories.length; idx++) {
            const currDate = new Date(histories[idx].updated_at.seconds * 1000).toLocaleString().split(',')[0];
            if (currDate === prevDate) {
                result[result.length - 1].transactions.push(histories[idx]);
            } else {
                result.push({ date: currDate, transactions: [histories[idx]] });
                prevDate = currDate;
            }
        }
        return result;
    }

    render() {
        const histories = this.useSelector(store => store.user.histories);

        const composedHistory = this.compose(histories);

        return this.create(
            `
        <div class="container history">
            <h2 class='block-title'>История</h2>
            <div class='history-header'>
              <p></p>
              <p>Количество</p>
              <p>Действие</p>
              <p>Сумма</p>
            </div>
            <div class='rates-wrapper'>
                ${this.resolve(composedHistory)}
            </div>
        </div>
        `,
            {
                HistoryCards: [HistoryCard, composedHistory.map((el, key) => ({ ...el, key }))],
            },
        );
    }
}

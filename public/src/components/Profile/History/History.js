import { Component } from '../../../modules/Softer/Softer.js';
import Tabs from './Tab/Tab.js';
import { apiHistory } from '../../../api.js';
import { setUserHistory } from '../../../store/actions.js';
import { jget } from '../../../modules/jfetch.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import Styler from "../../../modules/Styler";
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
            dispatch(setUserHistory(resp.data));
        });
    }

    resolve(histories) {
        const style = {
            color: 'gray'
        }
        if (!this.isFetched) {
            return `<h3 style="${Styler(style)}">История подгружается...</h3>`;
        }
        if (histories.length === 0) {
            return `<h3 style="${Styler(style)}">Вы еще не совершали операций :(</h3>`;
        } else {
            return '<Tabs></Tabs>';
        }
    }

    render() {
        const histories = this.useSelector(store => store.user.histories);

        return this.create(
            `
        <div class="container">
            <h2 class='block-title'>История</h2>
            <div class='rates-wrapper'>
                ${this.resolve(histories)}
            </div>
        </div>
        `,
            {
                Tabs: [
                    Tabs,
                    histories.map((history, idx) => ({
                        ...history,
                        key: idx,
                        date: new Date(Date.parse(history.datetime)).toLocaleString().split(', ')[0],
                        time: new Date(Date.parse(history.datetime)).toLocaleString().split(', ')[1],
                        value: (+history.value).toFixed(3),
                    })),
                ],
            },
        );
    }
}

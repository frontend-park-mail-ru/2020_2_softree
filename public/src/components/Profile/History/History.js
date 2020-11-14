import { Component } from '../../../modules/Softer/Softer.js';
import Tabs from './Tab/Tab.js';
import { apiHistory } from '../../../api.js';
import { setUserHistory } from '../../../store/actions.js';
import { jget } from '../../../modules/jfetch.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
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

    render() {
        const histories = this.useSelector(store => store.user.histories);

        return this.create(
            `
        <div class="container">
            <h2 class='block-title'>История</h2>
            <div class='rates-wrapper'>
                ${!this.isFetched ? '<h1>История подгружается...</h1>' : '<Tabs></Tabs>'}
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
                        value: (+history.value).toFixed(2),
                    })),
                ],
            },
        );
    }
}

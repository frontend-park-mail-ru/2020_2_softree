import { Component } from "../../../../modules/Softer/Softer";
import Transaction from "./Transaction/Transaction";
import './HistoryCard.scss';

export default class HistoryCard extends Component {
    constructor(props) {
        super(props);
    }

    initState() {
        return {
            isOpen: true,
        }
    }

    render() {
        const el = this.create(`
        <div class="history-card">
          <div class="history-card__header">${this.props.date}</div> 
          ${ this.state.isOpen ? 
            `
            <div class="history-card__body">
              <Transactions/>
            </div>` 
            : 
            ``}
        </div>
        `, {
            Transactions: [Transaction, this.props.transactions]
        })

        const toggle = () => this.setState({isOpen: !this.state.isOpen});

        this.listen('.history-card__header', 'click', toggle);

        return el;
    }
}

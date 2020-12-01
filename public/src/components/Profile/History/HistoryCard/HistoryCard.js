import { Component } from "../../../../modules/Softer/Softer";
import Transaction from "./Transaction/Transaction";
import './HistoryCard.scss';
import arrow from '../../../../images/upArrow.svg';
import Styler from "../../../../modules/Styler";

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
        const style = {
            transform: this.state.isOpen ? "rotate(180deg)" : ""
        }
        const el = this.create(`
        <div class="history-card">
          <div class="history-card__header">${this.props.date} 
          <img class="history-arrow" src="${arrow}" alt="arrow" style="${Styler(style)}"/>
        </div> 
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

import { Component } from '../../modules/Softer/Softer';
import { flagStore } from '../../utils/flagStore';

import './CurrencyCard.scss';

export default class CurrencyCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.create(`
        <div class="currency-card">
          <img src="${flagStore[this.props.title]}" alt="${this.props.title}">
          <p>${this.props.title}</p>
        </div>
        `);
    }
}

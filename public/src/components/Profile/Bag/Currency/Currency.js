import { Component } from '../../../../modules/Softer/Softer.js';

import '../Bag.scss';
import { flagStore } from "../../../../utils/flagStore";
import './Currency.scss';

export default class Currency extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        return this.create(`
        <div class="currency-card">
            <div class="currency-card__title">
              <img src="${flagStore[props.title]}" alt="currency"/>
              <p class="currency-card__title-title">${props.title}</p>
            </div>
            <p>${props.value}</p>
        </div>
        `);
    }
}

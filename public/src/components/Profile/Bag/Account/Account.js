import { Component } from '../../../../modules/Softer/Softer.js';

import '../Bag.scss';
import { flagStore } from "../../../../utils/flagStore";
import './Account.scss';

export default class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        return this.create(`
        <div class="account">
            <div class="account__title">
              <img src="${flagStore[props.title]}" alt="currency"/>
              <p class="account__title-title">${props.title}</p>
            </div>
            <p>${props.value}</p>
        </div>
        `);
    }
}

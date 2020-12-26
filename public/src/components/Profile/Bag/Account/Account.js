import { Component } from '../../../../modules/Softer/Softer.js';

import '../Bag.scss';
import { flagStore } from '../../../../utils/flagStore';
import './Account.scss';
import CurrencyCard from '../../../CurrencyCard/CurrencyCard';

export default class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        return this.create(
            `
        <div class="account">
            <CurrencyCard/>
            <p>${props.value}</p>
        </div>
        `,
            {
                CurrencyCard: [CurrencyCard, props],
            },
        );
    }
}

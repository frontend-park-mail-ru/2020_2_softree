import { Component } from '../../../modules/Softer/Softer.js';

import './Bag.scss';

export default class Currency extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        return this.create(`
        <div class="currency-card">
            <p>${props.title}</p>
            <p>${props.value}</p>
        </div>
        `);
    }
}

import { Component } from '../../../modules/Softer/Softer.js';
import Styler from '../../../modules/Styler.js';
import './Rate.scss';
import OpenedRate from './OpenedRate/OpenedRate';
import { flagStore } from '../../../utils/flagStore';

export default class Rate extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    calc(left, right, multiply = 1) {
        return ((right * multiply) / left).toFixed(3);
    }

    initState() {
        return {
            isOpened: false,
        };
    }

    toggle() {
        this.setState({ isOpened: !this.state.isOpened });
    }

    render() {
        const { props } = this;
        const { state } = this;


        const initialValue = this.calc(+props.leftInitial, +props.rightInitial);
        const currentValue = this.calc(props.left, props.right);

        let change = (initialValue - currentValue) / initialValue;
        let color = ''

        if (Math.abs(change) < 0.005) {
            change = 0;
        }

        if (change < 0) {
            color = '#E71D36';
            change = change.toFixed(2);
        } else if (change > 0 ) {
            color = '#60992D';
            change = '+' + change.toFixed(2);
        } else {
            change = '0'
        }

        const changeStyle = { color };

        const element = this.create(
            `
        <div class="rate-card">
            ${state.isOpened ? `<OpenedRate/>` : ''}
            <div class="rate-card__title">
              <img src="${flagStore[props.base]}" alt="${props.base}">
              <p>${props.base}/${props.title}</p>
            </div>
            <div class="rate-card__change" style="${Styler(changeStyle)}"> ${change}% </div>
            <div class="rate-card__price">
              <p>${currentValue}</p>
              <div class="rate-card__price-currency-card">
                <img src="${flagStore[props.title]}" alt="${props.title}">
                <p>${props.title}</p>
              </div>
            </div>
        </div>`,
            {
                OpenedRate: [OpenedRate, { base: props.base, currency: props.title, toggle: this.toggle.bind(this) }],
            },
        );

        this.listen('.rate-card', 'click', this.toggle.bind(this));

        return element;
    }
}

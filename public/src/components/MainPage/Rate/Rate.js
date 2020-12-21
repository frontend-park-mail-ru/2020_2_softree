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
        props.change = 1;
        const headerStyle = {
            background: props.change >= 0 ? '#60992D' : '#E71D36',
        };

        const initialValue = this.calc(+props.leftInitial, +props.rightInitial);
        const currentValue = this.calc(props.left, props.right);

        const change = (initialValue - currentValue) / initialValue;

        const element = this.create(
            `
        <div class="rate-card">
            ${state.isOpened ? `<OpenedRate/>` : ''}
            <div class="rate-card__title">
              <img src="${flagStore[props.base]}" alt="${props.base}">
              <p>${props.base}/${props.title}</p>
            </div>
            <div class="rate-card__change"> ${change.toFixed(2)}% </div>
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

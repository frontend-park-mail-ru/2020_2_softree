import { Component } from '../../../modules/Softer/Softer.js';
import Styler from '../../../modules/Styler.js';
import './Rate.css';
import OpenedRate from './OpenedRate/OpenedRate';

export default class Rate extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    calc(left, right, multiply) {
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
            background: props.change >= 0 ? '#73d473' : '#E71D36',
        };

        const element = this.create(
            `
        <div class="rate-card">
            ${state.isOpened ? `<OpenedRate/>` : ''}
            <div class="rate-card__header" style="${Styler(headerStyle)}">
                <p class="rate-card__header_title">${props.base}/${props.title}</p> 
                <p class="rate-card__header_change">${props.change >= 0 ? `+${props.change}` : props.change}%</p> 
            </div> 
            <div class="rate-card__body">
                <div class="rate-card__body_field">
                    <p class="rate-card__body_field-title">BUY</p> 
                    <p class="rate-card__body_field-value">${this.calc(props.left, props.right, 1.0007)}</p> 
                </div> 
                <div class="rate-card__body_field">
                    <p class="rate-card__body_field-title">SELL</p> 
                    <p class="rate-card__body_field-value">${this.calc(props.left, props.right, 0.9993)}</p> 
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

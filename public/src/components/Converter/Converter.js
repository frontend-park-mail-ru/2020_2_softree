import { Component } from '../../modules/Softer/Softer.js';
import Styler from '../../modules/Styler.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { toggleConverter } from '../../store/actions.js';
import './Converter.scss';

import upArrow from '../../images/upArrow.svg';
import close from '../../images/close.svg';
import calc from '../../images/calc.svg';

export default class Converter extends Component {
    initState() {
        return {
            isOpen: false,
            isHidden: false,
            leftCurrency: 'RUB',
            rightCurrency: 'USD',
            inputValue: 1,
            leftInputFocus: true,
        };
    }

    afterRerender() {
        if (this.state.leftInputFocus) {
            this.focus('leftCurrency');
        } else {
            this.focus('rightCurrency');
        }
    }

    focus(id) {
        const element = document.querySelector(`#${id}`);
        element.focus();
        const strLength = element.value.length * 2;
        element.setSelectionRange(strLength, strLength);
    }

    change(event) {
        if (isNaN(event.key)) {
            return;
        }
        const leftInputFocus = event.target.id === 'leftCurrency';
        this.setState({ leftInputFocus, inputValue: +event.target.value });
    }

    calcForInput(isLeft, currencyStore) {
        const { leftInputFocus, inputValue } = this.state;
        if (leftInputFocus) {
            if (isLeft) {
                return inputValue;
            }
            return (inputValue * this.calc(currencyStore)).toFixed(3);
        }
        if (isLeft) {
            return (inputValue / this.calc(currencyStore)).toFixed(3);
        }
        return inputValue;
    }

    changeCurrency(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    options(options, selectedTitle) {
        return options.map(
            option =>
                `<option value='${option.value}' 
              ${option.title === selectedTitle ? 'selected' : ''}
             >
              ${option.title}
             </option>`,
        );
    }

    calc(currencyStore) {
        const { rightCurrency, leftCurrency } = this.state;

        return currencyStore[rightCurrency].value / currencyStore[leftCurrency].value;
    }

    render() {
        const currency = this.useSelector(store => store.currency);

        const { isOpen, leftCurrency, rightCurrency } = this.state;

        const options = [];

        for (let title in currency) {
            options.push({ title, value: title });
        }

        const toggle = () => this.setState({ isOpen: !isOpen });

        const component = this.create(
            isOpen
                ? `
        <div class='converter'>
            <div class='converter__control-wrapper'>
                <h3 class='converter__control-title'>конвертер</h3>
                <div class='converter__close'><img src='${close}' alt='close'/></div>
            </div>
            <p class='converter__title'>
              1 ${leftCurrency} = ${this.calc(currency).toFixed(3)} ${rightCurrency}
            </p> 
            <div class='converter__inputs'>
                <div class='converter__inputs-container'>
                    <input type='text' id='leftCurrency' 
                        value='${this.calcForInput(true, currency)}' /> 
                    <select name="leftCurrency">
                        ${this.options(options, leftCurrency)}
                    </select>
                </div>
                <div class='converter__inputs-container'>
                    <input type='text' id='rightCurrency'
                        value='${this.calcForInput(false, currency)}'/> 
                    <select name="rightCurrency">
                        ${this.options(options, rightCurrency)}
                    </select>
                </div>
            </div>
        </div>
        `
                : `
        <div class="converter_closed">
          <img src="${calc}" alt="calculator"/> 
        </div>`,
        );

        this.listen('.converter__close', 'click', toggle);
        this.listen('input', 'keyup', this.change.bind(this));
        this.listen('input', 'keypress', e => {
            if (isNaN(e.key) && e.key !== '.') {
                e.preventDefault();
                return false;
            }
        });

        this.listen('.converter_closed', 'click', toggle);
        this.listen('select', 'change', this.changeCurrency.bind(this));

        return component;
    }
}

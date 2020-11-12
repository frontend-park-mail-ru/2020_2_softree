import { Component } from '../../modules/Softer/Softer.js';
import Styler from '../../modules/Styler.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { toggleConverter } from '../../store/actions.js';
import './Converter.css';

import upArrow from '../../images/upArrow.svg';
import close from '../../images/close.svg';

export default class Converter extends Component {
    initState() {
        return {
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

    toggleHide() {
        if (this.state.isHidden) {
            this.node.style.bottom = '';
            this.node.querySelector('.converter__hide img').style.transform = 'rotate(180deg)';
        } else {
            this.node.style.bottom = '-140px';
            this.node.querySelector('.converter__hide img').style.transform = '';
        }
        setTimeout(() => this.setState({ isHidden: !this.state.isHidden }), 200);
    }

    focus(id) {
        const element = document.querySelector(`#${id}`);
        element.focus();
        const strLength = element.value.length * 2;
        element.setSelectionRange(strLength, strLength);
    }

    change(event) {
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
        return (currencyStore[this.state.rightCurrency].value / currencyStore[this.state.leftCurrency].value).toFixed(
            3,
        );
    }

    render() {
        const currency = this.useSelector(store => store.currency);

        const isOpen = this.useSelector(store => store.app.converterIsOpen);

        const hideArrowStyle = {
            transform: `rotate(${this.state.isHidden ? '' : '180'}deg)`,
        };

        const converterStyle = {
            bottom: this.state.isHidden ? '-140px' : '',
        };

        const options = [];

        for (let title in currency) {
            options.push({ title, value: title });
        }

        const component = this.create(
            isOpen
                ? `
        <div class='converter' style='${Styler(converterStyle)}'>
            <div class='converter__control-wrapper'>
                <div class='converter__hide'><img src='${upArrow}' style='${Styler(hideArrowStyle)}' alt='hide'/></div>
                <h3 class='converter__control-title'>конвертер</h3>
                <div class='converter__close'><img src='${close}' alt='close'/></div>
            </div>
            <p class='converter__title'>
              1 ${this.state.leftCurrency} = ${this.calc(currency)} ${this.state.rightCurrency}
            </p> 
            <div class='converter__inputs'>
                <div class='converter__inputs-container'>
                    <input type='text' id='leftCurrency' 
                        value='${this.calcForInput(true, currency)}' /> 
                    <select name="leftCurrency">
                        ${this.options(options, this.state.leftCurrency)}
                    </select>
                </div>
                <div class='converter__inputs-container'>
                    <input type='text' id='rightCurrency'
                        value='${this.calcForInput(false, currency)}'/> 
                    <select name="rightCurrency">
                        ${this.options(options, this.state.rightCurrency)}
                    </select>
                </div>
            </div>
            <p class='converter__last-update'>Последнее обновление: 18:30</p>
        </div>
        `
                : '<div></div>',
        );

        const dispatch = useDispatch();

        this.listen('.converter__hide', 'click', this.toggleHide.bind(this));
        this.listen('.converter__close', 'click', () => dispatch(toggleConverter()));
        this.listen('.converter__control-title', 'click', this.toggleHide.bind(this));
        this.listen('input', 'keyup', this.change.bind(this));
        this.listen('input', 'keypress', e => {
            if (isNaN(e.key)) {
                e.preventDefault();
                return false;
            }
        });
        this.listen('select', 'change', this.changeCurrency.bind(this));

        return component;
    }
}

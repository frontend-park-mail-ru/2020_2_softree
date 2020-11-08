import { Component } from '../../modules/Softer/Softer.js';
import Styler from '../../modules/Styler.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { toggleConverter } from '../../store/actions.js';
import './Converter.css';

export default class Converter extends Component {
    constructor() {
        super();
    }

    initState() {
        return {
            isHidden: false,
            leftCurrency: 'USD',
            rightCurrency: 'RUB',
            leftValue: 1,
            rightValue: 0.013,
            leftInputFocus: true,
        };
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
        document.querySelector(`#${id}`).focus();
    }

    change(event) {
        const leftInputFocus = event.target.id === 'leftCurrency';
        this.setState({ leftInputFocus });
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
                <div class='converter__hide'><img src="/src/images/upArrow.svg" style='${Styler(
                    hideArrowStyle,
                )}' alt="hide"/></div>
                <h3 class='converter__control-title'>конвертер</h3>
                <div class='converter__close'><img src="/src/images/close.svg" alt="close"/></div>
            </div>
            <p class='converter__title'>1 ${this.state.leftCurrency.title} = ${this.state.rightCurrency.value} ${
                      this.state.rightCurrency.title
                  }</p> 
            <div class='converter__inputs'>
                <div class='converter__inputs_container'>
                    <input type='number' id='leftCurrency' 
                        value="${this.state.leftCurrency.value}" /> 
                    <select>
                        ${options.map(
                            option =>
                                `<option value="${option.value}" ${
                                    option.title === this.state.leftCurrency.title ? 'selected' : ''
                                }>${option.title}</option>`,
                        )}
                    </select>
                </div>
                <div class='converter__inputs_container'>
                    <input type='number' id='rightCurrency'
                        value="${this.state.rightCurrency.value}"/> 
                    <select>
                        ${options.map(
                            option =>
                                `<option value="${option.value}" ${
                                    option.title === this.state.rightCurrency.title ? 'selected' : ''
                                }>${option.title}</option>`,
                        )}
                    </select>
                </div>
            </div>
            <p class='converter__last_update'>Последнее обновление: 18:30</p>
        </div>
        `
                : '<div></div>',
        );

        const dispatch = useDispatch();

        this.listen('.converter__hide', 'click', this.toggleHide.bind(this));
        this.listen('.converter__close', 'click', () => dispatch(toggleConverter()));
        this.listen('.converter__control-title', 'click', this.toggleHide.bind(this));

        return component;
    }
}

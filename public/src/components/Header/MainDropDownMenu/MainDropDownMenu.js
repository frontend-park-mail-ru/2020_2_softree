import { Component } from '../../../modules/Softer/Softer.js';
import { pageMain } from '../../../pages.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import { toggleConverter } from '../../../store/actions.js';
import Styler from '../../../modules/Styler.js';

export default class MainDropDownMenu extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    render() {
        const converterIsOpen = this.useSelector(
            store => store.app.converterIsOpen,
        );

        const pushedStyle = {
            boxShadow: `inset 0 0 10px rgba(0, 0, 0, 0.2)`,
            background: 'rgba(0, 0, 0, 0.01)',
        };

        const node = this.create(`
        <div class="main-drop-down-menu">
            <div class='main-drop-down-menu__action-card' id='show-rates-action'
            style='${
                window.location.pathname === '/' ? Styler(pushedStyle) : ''
            }' >
                <img src='/src/images/rates.svg' alt='Котировки'>
                <p>Котировки</p>
            </div> 
            <div class='main-drop-down-menu__action-card' id='toggle-converter-action'
                style='${converterIsOpen ? Styler(pushedStyle) : ''}'>
                <img src='/src/images/calc.svg' alt='Конвертер'>
                <p>Конвертер</p>
            </div> 
        </div>
        `);

        const dispatch = useDispatch();

        this.listen(
            '.main-drop-down-menu__action-card',
            'click',
            this.props.close,
        );
        this.listen('#toggle-converter-action', 'click', () =>
            dispatch(toggleConverter()),
        );
        this.link('#show-rates-action', ...pageMain());
        return node;
    }
}

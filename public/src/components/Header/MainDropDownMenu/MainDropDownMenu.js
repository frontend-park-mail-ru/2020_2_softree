import { Component } from '../../../modules/Softer/Softer.js';
import { pageMain } from '../../../pages.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import { toggleConverter } from '../../../store/actions.js';
import calc from '../../../images/calc.svg';
import rates from '../../../images/rates.svg';
import './MainDropDownMenu.scss';
import ActionButton from '../../UI/ActionButton/ActionButton';

export default class MainDropDownMenu extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    render() {
        const converterIsOpen = this.useSelector(store => store.app.converterIsOpen);
        const dispatch = useDispatch();

        const buttons = [
            {
                content: `<img src='${rates}' alt='Котировки'><p>Котировки</p>`,
                isPushed: () => window.location.pathname === '/',
                clb: () => {
                    this.redirect(...pageMain());
                    this.props.close();
                },
            },
            {
                content: `<img src='${calc}' alt='Конвертер'><p>Конвертер</p>`,
                isPushed: () => converterIsOpen,
                clb: () => {
                    dispatch(toggleConverter());
                    this.props.close();
                },
            },
        ];

        return this.create(
            `
        <div class="main-drop-down-menu">
          <ActionButtons/> 
        </div>
        `,
            {
                ActionButtons: [ActionButton, buttons.map((button, key) => ({ ...button, key }))],
            },
        );
    }
}

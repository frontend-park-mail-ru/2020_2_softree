import { Component } from '../../../modules/Softer/Softer.js';
import { pageSettings, pageSignIn } from '../../../pages.js';
import { jdelete, jpost } from '../../../modules/jfetch.js';
import { apiLogOut } from '../../../api.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import { dropUserData } from '../../../store/actions.js';
import './DropDownMenu.css';

export default class DropDownMenu extends Component {
    constructor(props) {
        super(props);
    }

    logOut(e) {
        e.preventDefault();
        this.props.close();
        jdelete(apiLogOut()).catch(({ status }) => {
            if (status === 302) {
                useDispatch()(dropUserData());
                this.redirect(...pageSignIn());
            }
        });
    }

    render() {
        const element = this.create(`
        <div class='drop-down-menu'>
            <div class='drop-down-menu__button' id='drop-down-settings-btn'>Настройки</div> 
            <div class='drop-down-menu__button' id='drop-down-exit-btn'>Выйти</div> 
        </div> 
        `);

        this.listen('#drop-down-settings-btn', 'click', () => {
            this.props.close();
            this.redirect(...pageSettings());
        });
        this.listen('#drop-down-exit-btn', 'click', this.logOut.bind(this));

        return element;
    }
}

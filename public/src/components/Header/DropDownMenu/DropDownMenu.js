import { Component } from '../../../modules/Softer/Softer.js';
import { pageSettings, pageSignIn } from '../../../pages.js';
import { jdelete, jpost } from '../../../modules/jfetch.js';
import { apiLogOut } from '../../../api.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import { dropUserData } from '../../../store/actions.js';
import './DropDownMenu.scss';

export default class DropDownMenu extends Component {
    constructor(props) {
        super(props);
    }

    logOut(e) {
        e.preventDefault();
        this.props.close();
        const dropAndRedirect = () => {
            useDispatch()(dropUserData());
            this.redirect(...pageSignIn());
        };

        jdelete(apiLogOut()).then(dropAndRedirect).catch(dropAndRedirect);
    }

    render() {
        const email = this.useSelector(store => store.user.userData.email);

        const element = this.create(`
        <div class='drop-down-menu'>
          <div class='drop-down-menu__info'> ${email} </div>
          <div class='drop-down-menu__control'>
            <div class='drop-down-menu__button' id='drop-down-settings-btn'>Настройки</div> 
            <div class='drop-down-menu__button' id='drop-down-exit-btn'>Выйти</div> 
          </div>
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

import {Component} from "../../modules/Softer/Softer.js";
import {pageMain, pageSignUp} from "../../pages.js";

export class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const [header] = this.create('header', `
        <div class="header__logo">
            <img class="header__logo_img" src="/src/images/cat.svg" alt="Logo"/>
            <p class="header__logo_text">MoneyCat</p>
        </div>
        <div class="header__control">
            <img class="header__control_avatar" src="/src/images/avatar.svg" alt="Aavatar"/>
        </div>`);

        header.className = 'header';


        const data = this.useSelector(state => state.user.userData)
        const redirectIfNotAuth = () => {
            if (!data) {
                this.redirect(...pageSignUp())
                return true;
            }
            return false;
        }

        this.link('.header__logo', ...pageMain(), redirectIfNotAuth);
        this.link('.header__control_avatar', 'Профиль', '/profile', redirectIfNotAuth);

        return header;
    }
}

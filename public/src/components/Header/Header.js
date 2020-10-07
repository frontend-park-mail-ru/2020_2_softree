import { Component } from '../../modules/Softer/Softer.js';
import { pageMain } from '../../pages.js';

export class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.useSelector(store => store.user.userData);

        const [header] = this.create('header', `
            <div class='header__logo'>
                <img class='header__logo_img' src='/src/images/cat.svg' alt='Logo'/>
                <p class='header__logo_text'>MoneyCat</p>
            </div>
            <div class='header__control'>
                <img class='header__control_avatar' src=${data && data.avatar || '/src/images/avatar.svg'} alt='Aavatar'/>
            </div>
        `);

        header.className = 'header';

        this.link('.header__logo', ...pageMain());
        this.link('.header__control_avatar', 'Профиль', '/profile');

        return header;
    }
}

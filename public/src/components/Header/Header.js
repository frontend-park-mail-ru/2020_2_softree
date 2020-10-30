import { Component } from '../../modules/Softer/Softer.js';
import { pageMain, pageProfile, pageSettings } from '../../pages.js';

export class Header extends Component {
    constructor() {
        super();
    }

    render() {
        const data = this.useSelector(store => store.user.userData);

        const header = this.create(`
            <header class='header'> 
                <div class="container">
                    <div class ='bag__btn'>
                        <img class='header__bag_img' src='/src/images/bag.svg' alt='Bag'/>
                    </div>
                    <div class='header__logo'>
                        <img class='header__logo_img' src='/src/images/cat.svg' alt='Logo'/>
                        <p class='header__logo_text'>MoneyCat</p>
                    </div>
                    <div class='header__control'>
                        <img class='header__control_avatar' src=${
                            data.avatar || '/src/images/avatar.svg'
                        } alt='Aavatar'/>
                    </div>
                </div>
            </header>
        `);

        this.link('.header__logo', ...pageMain());
        this.link('.header__control_avatar', ...pageSettings());
        this.link('.header__bag_img', ...pageProfile());

        return header;
    }
}

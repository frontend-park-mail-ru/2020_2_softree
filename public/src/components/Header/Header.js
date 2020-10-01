import {Component, Link, softCreate} from "../../modules/Softer/Softer.js";

export class Header extends Component {
    constructor(parent, props) {
        super(parent, props);

        this.includeCSS();
    }

    render() {
        const [header, _, listen] = softCreate('header', `
        <div class="header__logo">
            <img class="header__logo_img" src="src/images/cat.svg" alt="Logo"/>
            <p class="header__logo_text">MoneyCat</p>
        </div>
        <div class="header__control">
            <img class="header__control_avatar" src="src/images/avatar.svg" alt="Aavatar"/>
        </div>`);

        header.className = 'header';

        listen('.header__logo', 'click', Link('Главная страница', "/"));
        listen('.header__control_avatar', 'click', Link('Профиль', '/signup'));

        return header;
    }
}

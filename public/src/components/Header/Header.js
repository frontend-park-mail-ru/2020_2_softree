import {Component, Link} from "../../modules/Softer/Softer.js";

export class Header extends Component {
    constructor(parent, props) {
        super(parent, props);

        this.includeCSS();
    }

    render() {
        const header = document.createElement('header')
        header.className = 'header';
        header.innerHTML = `
        <div class="header__logo">
            <img class="header__logo_img" src="src/images/cat.svg" alt="Logo"/>
            <p class="header__logo_text">MoneyCat</p>
        </div>
        <div class="header__control">
            <img class="header__control_avatar" src="src/images/avatar.svg" alt="Aavatar"/>
        </div>`;

        header.querySelector('.header__logo')
            .addEventListener('click', Link('Главная страница', "/"));

        header.querySelector('.header__control_avatar')
            .addEventListener('click', Link('Профиль', '/signup'));

        return header;
    }
}

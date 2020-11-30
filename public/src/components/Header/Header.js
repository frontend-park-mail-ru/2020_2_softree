import { Component } from '../../modules/Softer/Softer.js';
import { pageProfile, pageSettings } from '../../pages.js';
import Styler from '../../modules/Styler.js';
import DropDownMenu from './DropDownMenu/DropDownMenu.js';
import { checkAuth } from '../../utils/utils.js';
import MainDropDownMenu from './MainDropDownMenu/MainDropDownMenu.js';

import './Header.scss';

import defaultAvatar from '../../images/avatar.svg';
import logo from '../../images/cat.svg';
import { pageMain } from '../../pages';

export class Header extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    initState() {
        return {
            dropDownMenuIsOpen: false,
        };
    }

    render() {
        const data = this.useSelector(store => store.user.userData);

        const isAuth = checkAuth(data);

        const nonInvertStyle = {
            filter: 'none',
        };

        const containerStyle = {
            justifyContent: !isAuth && 'center',
        };

        const toggleMenu = () => this.setState({ dropDownMenuIsOpen: !this.state.dropDownMenuIsOpen });

        const header = this.create(
            `
      <header class='header'>
        <div class='container header__container' style='${Styler(containerStyle)}'>
          <div class='header__logo'>
            <img class='header__logo-img' src='${logo}' alt='Logo'/>
            <p class='header__logo-text'>MoneyCat</p>
          </div>
          ${
              isAuth
                  ? `
            <div class='header__control'>
              <p id="account" class="header__account">Личный кабинет</p>
              <div>
                <img class='header__control-avatar'
                  style='${data.avatar ? Styler(nonInvertStyle) : ''}'
                  src="${data.avatar || defaultAvatar}" 
                  alt='Avatar'/> 
                ${this.state.dropDownMenuIsOpen ? `<DropDownMenu/>` : ''}
              </div>
            </div>`
                  : ''
          }
        </div>
<<<<<<< HEAD
        ${isAuth ?
                `<div class="container header__control">
                    <p id="bag">Портфель</p>
=======
        ${
            isAuth
                ? `<div class="container header__control">
                    <p id="bag">Портфель</p> 
>>>>>>> 4d03aa214fd2514b1efb970aa4483e5e7073e798
                    <p id="catalog">Каталог</p>
                    <p id="history">История</p>
                 </div>`
                : ''
        }
      </header> `,
            {
                DropDownMenu: [DropDownMenu, { close: toggleMenu }],
            },
        );

        this.link('#bag', ...pageProfile());
        this.link('.header__logo', ...pageMain());
<<<<<<< HEAD
        this.link("#catalog", ...pageMain());
        this.link("#account", ...pageSettings());
        this.link("#history", ...pageHistory());
=======
        this.link('#catalog', ...pageMain());
        this.link('#account', ...pageSettings());
>>>>>>> 4d03aa214fd2514b1efb970aa4483e5e7073e798

        this.listen('.header__control-avatar', 'click', toggleMenu);

        return header;
    }
}

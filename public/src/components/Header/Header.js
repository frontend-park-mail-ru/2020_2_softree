import { Component } from '../../modules/Softer/Softer.js';
import { pageProfile } from '../../pages.js';
import Styler from '../../modules/Styler.js';
import DropDownMenu from './DropDownMenu/DropDownMenu.js';
import { checkAuth } from '../../utils/utils.js';
import MainDropDownMenu from './MainDropDownMenu/MainDropDownMenu.js';
import './Header.css';
import defaultAvatar from '../../images/avatar.svg';
import logo from '../../images/cat.svg';
import bag from '../../images/bag.svg';

export class Header extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    initState() {
        return {
            dropDownMenuIsOpen: false,
            mainDropDownMenuIsOpen: false,
        };
    }

    closeAll() {
        this.setState({
            mainDropDownMenuIsOpen: false,
            dropDownMenuIsOpen: false,
        });
    }

    open(isAuth, isOpen, toggle) {
        if (!isAuth) {
            return;
        }

        this.props.toggle();
        if (isOpen) {
            setTimeout(toggle, 200);
        } else {
            if (this.state.dropDownMenuIsOpen || this.state.mainDropDownMenuIsOpen) {
                setTimeout(() => {
                    this.closeAll();
                    setTimeout(this.props.toggle, 10);
                    toggle();
                }, 200);
            } else {
                toggle();
            }
        }
    }

    toggleMenu(isAuth) {
        this.open(isAuth, this.state.dropDownMenuIsOpen, () =>
            this.setState({
                dropDownMenuIsOpen: !this.state.dropDownMenuIsOpen,
            }),
        );
    }

    toggleMainMenu(isAuth) {
        this.open(isAuth, this.state.mainDropDownMenuIsOpen, () =>
            this.setState({
                mainDropDownMenuIsOpen: !this.state.mainDropDownMenuIsOpen,
            }),
        );
    }

    render() {
        console.log('avatar', defaultAvatar);
        const data = this.useSelector(store => store.user.userData);

        const isAuth = checkAuth(data);

        const nonInvertStyle = {
            filter: 'none',
        };

        const containerStyle = {
            justifyContent: !isAuth && 'center',
        };

        const toggleMenu = () => this.toggleMenu.bind(this)(isAuth);
        const toggleMainMenu = () => this.toggleMainMenu.bind(this)(isAuth);

        const header = this.create(
            `
      <header class='header'>
        <div class='container header__container' style='${Styler(containerStyle)}'>
          ${
              isAuth
                  ? `
            <div class ='header__bag-btn'>
              <img class='header__bag-btn-img' src='${bag}' alt='Bag'/>
            </div>`
                  : ''
          }
          <div class='header__logo'>
            <img class='header__logo-img' src='${logo}' alt='Logo'/>
            <p class='header__logo-text'>MoneyCat</p>
          </div>
          ${
              isAuth
                  ? `
            <div class='header__control'>
              <img class='header__control-avatar'
                style='${data.avatar ? Styler(nonInvertStyle) : ''}'
                src="${data.avatar || defaultAvatar}" 
                alt='Avatar'/> 
            </div>`
                  : ''
          }
        </div>
        <div class='container header__drop-menu'>
          ${this.state.dropDownMenuIsOpen ? `<DropDownMenu/>` : ''}
          ${this.state.mainDropDownMenuIsOpen ? `<MainDropDownMenu/>` : ''}
        </div>
      </header>`,
            {
                DropDownMenu: [DropDownMenu, { close: toggleMenu }],
                MainDropDownMenu: [MainDropDownMenu, { close: toggleMainMenu }],
            },
        );

        this.listen('.header__bag-btn', 'click', () => {
            if (this.props.isOpen) {
                this.props.toggle();
            }
            setTimeout(this.closeAll.bind(this), 200);
        });
        this.link('.header__bag-btn', ...pageProfile());
        this.listen('.header__control-avatar', 'click', toggleMenu);
        this.listen('.header__logo', 'click', toggleMainMenu);

        return header;
    }
}

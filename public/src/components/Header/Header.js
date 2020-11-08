import { Component } from '../../modules/Softer/Softer.js';
import { pageProfile } from '../../pages.js';
import Styler from '../../modules/Styler.js';
import DropDownMenu from './DropDownMenu/DropDownMenu.js';
import { checkAuth } from '../../utils/utils.js';
import MainDropDownMenu from './MainDropDownMenu/MainDropDownMenu.js';

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
            if (
                this.state.dropDownMenuIsOpen ||
                this.state.mainDropDownMenuIsOpen
            ) {
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
        const data = this.useSelector(store => store.user.userData);

        const isAuth = checkAuth(data);

        const nonInvertStyle = {
            filter: 'none',
        };

        const containerStyle = {
            justifyContent: isAuth ? '' : 'center',
        };

        const header = this.create(
            `
            <header class='header'> 
                <div class='container' style='${Styler(containerStyle)}'>
                    ${
                        isAuth
                            ? `<div class ='bag__btn'>
                        <img class='header__bag_img' src='/src/images/bag.svg' alt='Bag'/>
                    </div>`
                            : ''
                    }
                    <div class='header__logo'>
                        <img class='header__logo_img' src='/src/images/cat.svg' alt='Logo'/>
                        <p class='header__logo_text'>MoneyCat</p>
                    </div>
                    ${
                        isAuth
                            ? `<div class='header__control'>
                        <img class='header__control_avatar' 
                        style='${data.avatar ? Styler(nonInvertStyle) : ''}' 
                        src=${data.avatar || '/src/images/avatar.svg'} 
                        alt='Avatar'/>
                    </div>`
                            : ''
                    }
                </div>
                <div class='container drop-menu'>
                    ${this.state.dropDownMenuIsOpen ? `<DropDownMenu/>` : ''}
                    ${
                        this.state.mainDropDownMenuIsOpen
                            ? `<MainDropDownMenu/>`
                            : ''
                    }
                </div>
            </header>
        `,
            {
                DropDownMenu: [
                    DropDownMenu,
                    { close: () => this.toggleMenu.bind(this)(isAuth) },
                ],
                MainDropDownMenu: [
                    MainDropDownMenu,
                    { close: () => this.toggleMainMenu.bind(this)(isAuth) },
                ],
            },
        );

        this.listen('.header__bag_img', 'click', () => {
            if (this.props.isOpen) {
                this.props.toggle();
            }
            setTimeout(this.closeAll.bind(this), 200);
        });
        this.link('.header__bag_img', ...pageProfile());
        this.listen('.header__control_avatar', 'click', () =>
            this.toggleMenu.bind(this)(isAuth),
        );
        this.listen('.header__logo', 'click', () =>
            this.toggleMainMenu.bind(this)(isAuth),
        );

        return header;
    }
}

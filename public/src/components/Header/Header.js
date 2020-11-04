import {Component} from '../../modules/Softer/Softer.js';
import {pageMain, pageProfile, pageSettings} from '../../pages.js';
import Styler from '../../modules/Styler.js';
import DropDownMenu from './DropDownMenu/DropDownMenu.js';
import {checkAuth} from "../../utils/utils.js";

export class Header extends Component {
    constructor(props) {
        super(props);

        this.doNotReset = true;
    }

    initState() {
        return {dropDownMenuIsOpen: false}
    }

    openMenu() {
        if (this.state.dropDownMenuIsOpen) {
            setTimeout(() => this.setState({dropDownMenuIsOpen: !this.state.dropDownMenuIsOpen}), 200);
        } else {
            this.setState({dropDownMenuIsOpen: !this.state.dropDownMenuIsOpen})
        }
        this.props.toggle();
    }

    render() {
        const data = this.useSelector(store => store.user.userData);

        const isAuth = checkAuth(data);

        const nonInvertStyle = {
            filter: 'none',
        }

        const containerStyle = {
            justifyContent: isAuth ? '' : 'center',
        }

        const header = this.create(`
            <header class='header'> 
                <div class='container' style='${Styler(containerStyle)}'>
                    ${isAuth ? 
                    `<div class ='bag__btn'>
                        <img class='header__bag_img' src='/src/images/bag.svg' alt='Bag'/>
                    </div>` : 
                    ''}
                    <div class='header__logo'>
                        <img class='header__logo_img' src='/src/images/cat.svg' alt='Logo'/>
                        <p class='header__logo_text'>MoneyCat</p>
                    </div>
                    ${isAuth ?
                    `<div class='header__control'>
                        <img class='header__control_avatar' 
                        style='${data.avatar ? Styler(nonInvertStyle) : ''}' 
                        src=${data.avatar || '/src/images/avatar.svg'} 
                        alt='Avatar'/>
                    </div>` : ''}
                </div>
                <div class='container drop-menu'>
                    ${this.state.dropDownMenuIsOpen ? `<DropDownMenu/>` : ''}
                </div>
            </header>
        `, {
            DropDownMenu: [DropDownMenu, {close: this.openMenu.bind(this)}]
        });

        this.link('.header__logo', ...pageMain());
        this.link('.header__bag_img', ...pageProfile());
        this.listen('.header__control_avatar', 'click', this.openMenu.bind(this));

        return header;
    }
}

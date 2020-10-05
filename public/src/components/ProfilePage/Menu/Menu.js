import {Component} from "../../../modules/Softer/Softer.js";

export default class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const [menu, replace, listen] = this.create('div', `
        <div class="menu">
            <div class="wrapper__left">
                <div class="button__bag button">
                    <p class="button__bag_text">Портфель</p>
                </div>
                <div class="button__history button">
                    <p class="button__bag_text">История</p>
                </div>
            </div>
            <div class="wrapper__right">
                <div class="button__settings button">
                    <p class="button__bag_text">Настройки</p>
                </div>
            </div>
        </div>`);

        this.link('.button__bag', 'История', '/profile/history');
        this.link('.button__history', 'Настройки профиля', '/profile/settings');
        this.link('.button__settings', 'Портфель', '/profile')

        return menu
    }
}

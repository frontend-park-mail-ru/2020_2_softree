import {Component} from "../../modules/Softer/Softer.js";

export default class Menu extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const [menu] = this.create('div', `
            <div class="flex-menu">
                <div class="flex-left">
                    <div class="b1-link btn">Портфель</div>
                    <div class="b2-link btn">История</div>
                </div>
                <div class="b3-link btn">Настройки</div>
            </div>
                `)
        this.link('.b1-link', 'Main', '/profile');
        this.link('.b2-link', 'Settings', '/profile/settings');
        this.link('.b3-link', 'History', '/profile/history');

        return menu;
    }
}

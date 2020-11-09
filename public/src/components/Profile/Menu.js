import { Component } from '../../modules/Softer/Softer.js';
import { pageProfile, pageHistory } from '../../pages.js';
import Styler from '../../modules/Styler.js';

export default class Menu extends Component {
    constructor() {
        super();
    }

    render() {
        const pushedStyle = {
            boxShadow: `inset 0 0 10px rgba(0, 0, 0, 0.2)`,
            background: 'rgba(0, 0, 0, 0.01)',
        };

        const menu = this.create(`
        <div>
            <div class="flex-menu container">
                <div class="flex-left">
                    <div class='b1-link action-btn' style='${
                        window.location.pathname === '/profile' ? Styler(pushedStyle) : ''
                    }'>Портфель</div>
                    <div class='b2-link action-btn' style='${
                        window.location.pathname === '/profile/history' ? Styler(pushedStyle) : ''
                    }'>История</div>
                </div>
            </div>
        </div>
        `);

        this.link('.b1-link', ...pageProfile());
        this.link('.b2-link', ...pageHistory());

        return menu;
    }
}

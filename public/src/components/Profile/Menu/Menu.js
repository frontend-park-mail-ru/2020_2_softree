import { Component } from '../../../modules/Softer/Softer';
import { pageProfile, pageHistory } from '../../../pages';
import ActionButton from '../../UI/ActionButton/ActionButton';

import './Menu.scss';

export default class Menu extends Component {
    constructor() {
        super();

        this.buttons = [
            {
                content: 'Портфель',
                isPushed: () => window.location.pathname === '/profile',
                clb: () => this.redirect(...pageProfile()),
            },
            {
                content: 'История',
                isPushed: () => window.location.pathname === '/profile/history',
                clb: () => this.redirect(...pageHistory()),
            },
        ];
    }

    render() {
        return this.create(
            `
        <div class="menu container">
            <ActionButtons/>
        </div>
        `,
            {
                ActionButtons: [ActionButton, this.buttons.map((button, idx) => ({ ...button, key: idx }))],
            },
        );
    }
}

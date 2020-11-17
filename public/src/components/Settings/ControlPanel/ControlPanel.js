import { Component } from '../../../modules/Softer/Softer.js';
import { pageMain, pagePassword, pageSettings } from '../../../pages.js';
import Styler from '../../../modules/Styler.js';

import './ControlPanel.scss';
import ActionButton from '../../UI/ActionButton/ActionButton';

export default class ControlPanel extends Component {
    constructor() {
        super();

        this.buttons = [
            {
                content: `Настройки пользователя`,
                isPushed: () => window.location.pathname === '/settings',
                clb: () => this.redirect(...pageSettings()),
            },
            {
                content: `Изменить пароль`,
                isPushed: () => window.location.pathname === '/settings/password',
                clb: () => this.redirect(...pagePassword()),
            },
        ];
    }

    render() {
        return this.create(
            `
            <div class="control-panel">
              <ActionButtons/>
            </div>
            `,
            {
                ActionButtons: [ActionButton, this.buttons.map((button, key) => ({ ...button, key }))],
            },
        );
    }
}

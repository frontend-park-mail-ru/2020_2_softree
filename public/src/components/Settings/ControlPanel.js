import { Component } from '../../modules/Softer/Softer.js';
import { pagePassword, pageSettings } from '../../pages.js';
import Styler from '../../modules/Styler.js';

export default class ControlPanel extends Component {
    render() {
        const pushedStyle = {
            boxShadow: `inset 0 0 10px rgba(0, 0, 0, 0.2)`,
            background: 'rgba(0, 0, 0, 0.01)',
        };

        const controlPanel = this.create(
            `
            <div class="control-panel">
                <div class="b1-link action-btn" style='${
                    window.location.pathname === '/settings' ? Styler(pushedStyle) : ''
                }'>Настройки пользователя
                </div>
                <div class="b2-link action-btn" style='${
                    window.location.pathname === '/settings/password' ? Styler(pushedStyle) : ''
                }'>Изменить пароль
                </div>
            </div>
            `,
        );

        this.link('.b1-link', ...pageSettings());
        this.link('.b2-link', ...pagePassword());
        return controlPanel;
    }
}

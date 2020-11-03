import { Component } from '../../modules/Softer/Softer.js';
import { pagePassword, pageSettings } from '../../pages.js';
import Exit from './Exit.js';

export default class ControlPanel extends Component {
    constructor() {
        super();
    }

    render() {
        const controlPanel = this.create(
            `
            <div class="control-panel">
                <div class="b1-link btn">Настройки пользователя</div>
                <div class="b2-link btn">Изменить пароль</div>
                <Exit/>
            </div>
            `,
            {
                Exit,
            },
        );

        this.link('.b1-link', ...pageSettings());
        this.link('.b2-link', ...pagePassword());
        return controlPanel;
    }
}

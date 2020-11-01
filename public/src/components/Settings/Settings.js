import { Component, Switch } from '../../modules/Softer/Softer.js';
import ControlPanel from './ControlPanel.js';
import Exit from './Exit.js';
import User from './User.js';
import Password from './Password.js';

export default class Settings extends Component {
    constructor() {
        super();
    }

    render() {
        return this.create(
            `
            <div class="container-settings">
                <Exit/>
                <div class="settings-flexbox">
                    <ControlPanel/>
                    <Content/>
                </div>
            </div>`,
            {
                Exit,
                ControlPanel,
                Content: [
                    Switch,
                    {
                        routers: [
                            {
                                path: '/settings/password',
                                component: Password,
                            },
                            {
                                path: '/settings',
                                component: User,
                            },
                        ],
                    },
                ],
            },
        );
    }
}

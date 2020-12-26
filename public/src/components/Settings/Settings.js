import { Component, Switch } from '../../modules/Softer/Softer.js';
import ControlPanel from './ControlPanel/ControlPanel.js';
import User from './User/User.js';
import Password from './Password/Password.js';

import './Settings.scss';

export default class Settings extends Component {
    render() {
        return this.create(
            `
            <div class="settings container">
                <ControlPanel/>
                <div class="settings__window">
                    <Content/>
                </div>
            </div>`,
            {
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

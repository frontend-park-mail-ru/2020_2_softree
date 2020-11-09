import { Component, Switch } from '../../modules/Softer/Softer.js';
import ControlPanel from './ControlPanel.js';
import User from './User.js';
import Password from './Password.js';

import './Settings.css';

export default class Settings extends Component {
    constructor() {
        super();
    }

    render() {
        return this.create(
            `
            <div class="settings-flexbox container">
                <div class="settings-ctrl__panel">
                    <ControlPanel/>
                </div>
                <div class="settings-payload__window">
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

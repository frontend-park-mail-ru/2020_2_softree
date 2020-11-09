import { Component, Switch } from '../../modules/Softer/Softer';
import ControlPanel from './ControlPanel';
import User from './User';
import Password from './Password';

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

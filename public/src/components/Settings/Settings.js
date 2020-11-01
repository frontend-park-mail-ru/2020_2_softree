import { Component, Switch } from '../../modules/Softer/Softer.js';
import ControlPanel from './ControlPanel.js';
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
                <div class="settings-flexbox">
                    <div class="settings-ctrl__panel">
                        <ControlPanel/>
                    </div>
                    <div class="settings-payload">
                        <Content/>
                    </div>
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

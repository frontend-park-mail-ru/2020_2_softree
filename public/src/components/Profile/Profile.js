import {Component, Router, Switch} from '../../modules/Softer/Softer.js';
import Menu from './Menu.js';
import ProfileMain from './ProfileMain.js';
import ProfileHistory from './ProfileHistory.js';
import ProfileSettings from './ProfileSettings/ProfileSettings.js';
import Page404 from '../Page404/Page404.js';

export default class Profile extends Component {
    constructor() {
        super();
    }

    render() {
        return this.create(`
        <div>
            <Menu/>
            <ProfilePage/>
        </div>
        `, {
            Menu,
            ProfilePage: [Switch, {
                path: '/profile', routers: [
                    {path: '', component: ProfileMain, exact: true},
                    {path: '/settings', component: ProfileSettings, exact: true},
                    {path: '/history', component: ProfileHistory, exact: true},
                    {component: Page404}
                ]
            }]
        });
    }
}

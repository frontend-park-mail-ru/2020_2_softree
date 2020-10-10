import { Component, Router, Switch } from '../../modules/Softer/Softer.js';
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
        const [page, replace] = this.create('div', `
        <Menu></Menu>
        <ProfilePage></ProfilePage>
        `);

        replace({
            Menu: this.place(Menu),
            ProfilePage: new Switch(
                this.place(Router, { path: '/profile', component: ProfileMain, exact: true }),
                this.place(Router, { path: '/profile/settings', component: ProfileSettings, exact: true }),
                this.place(Router, { path: '/profile/history', component: ProfileHistory, exact: true }),
                this.place(Router, { component: Page404 })
            )
        });
        return page;
    }
}

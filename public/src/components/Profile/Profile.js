import { Component, Switch } from '../../modules/Softer/Softer.js';
import Menu from './Menu.js';
import ProfileHistory from './History/History.js';
import Page404 from '../Page404/Page404.js';

export default class Profile extends Component {
    constructor() {
        super();
    }

    render() {
        return this.create(
            `
        <div>
            <Menu/>
            <ProfilePage/>
        </div>
        `,
            {
                Menu,
                ProfilePage: [
                    Switch,
                    {
                        routers: [
                            {
                                path: '/bag',
                                component: ProfileMain,
                                exact: true,
                            },
                            {
                                path: '/history',
                                component: ProfileHistory,
                                exact: true,
                            },
                            { component: Page404 },
                        ],
                    },
                ],
            },
        );
    }
}

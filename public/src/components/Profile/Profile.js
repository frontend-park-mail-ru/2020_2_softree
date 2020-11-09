import { Component, Switch } from '../../modules/Softer/Softer.js';
import Menu from './Menu.js';
import History from './History/History.js';
import Bag from './Bag/Bag.js';

export default class Profile extends Component {
    render() {
        return this.create(
            `
        <div>
            <Menu/>
            <Content/>
        </div>
        `,
            {
                Menu,
                Content: [
                    Switch,
                    {
                        routers: [
                            {
                                path: '/profile/history',
                                component: History,
                            },
                            {
                                path: '/profile',
                                component: Bag,
                            },
                        ],
                    },
                ],
            },
        );
    }
}

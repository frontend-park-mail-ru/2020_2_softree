import { Component, Router, Switch } from '../modules/Softer/Softer.js';
import { Header } from './Header/Header.js';
import { SignUp } from './SignUp/SignUp.js';
import History from './Profile/History/History.js';
import Bag from './Profile/Bag/Bag.js';
import MainPage from './MainPage/MainPage.js';
import SignIn from './SignIn/SignIn.js';
import Settings from './Settings/Settings.js';
import Page404 from './Page404/Page404.js';
import { useDispatch } from '../modules/Softer/softer-softex.js';
import { fetchUserData } from '../store/actions.js';
import { pageSignUp } from '../pages.js';

export default class App extends Component {
    constructor() {
        super();

        window.app = this;

        const dispatch = useDispatch();
        dispatch(fetchUserData(() => this.redirect(...pageSignUp())));
    }

    printTree(node, level) {
        console.log('\t'.repeat(level) + node.constructor.name);
        if (node.children) {
            console.log(
                '\t'.repeat(level),
                'children: ',
                node.children.map(node => node.constructor.name).join(', '),
            );
            node.children.forEach(node => this.printTree(node, level + 1));
        }
    }

    render() {
        return this.create(
            `
        <div>
            <Header/>
            <MainContent/>
        </div>
        `,
            {
                Header,
                MainContent: [
                    Switch,
                    {
                        routers: [
                            {
                                path: '/',
                                component: MainPage,
                                exact: true,
                                authRequired: true,
                            },
                            { path: '/signin', component: SignIn, exact: true },
                            { path: '/signup', component: SignUp, exact: true },
                            {
                                path: '/bag',
                                component: Bag,
                                authRequired: true,
                            },
                            {
                                path: '/history',
                                component: History,
                                authRequired: true,
                            },
                            {
                                path: '/settings',
                                component: Settings,
                                authRequired: true,
                            },
                            { component: Page404 },
                        ],
                    },
                ],
            },
        );
    }
}

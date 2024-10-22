import { Component, Switch } from '../modules/Softer/Softer.js';
import { Header } from './Header/Header.js';
import { SignUp } from './SignUp/SignUp.js';
import History from './Profile/History/History.js';
import Bag from './Profile/Bag/Bag.js';
import MainPage from './MainPage/MainPage.js';
import SignIn from './SignIn/SignIn.js';
import Settings from './Settings/Settings.js';
import Page404 from './Page404/Page404.js';
import { useDispatch } from '../modules/Softer/softer-softex.js';
import { fetchUserData, setCurrency, setInitialCurrency } from '../store/actions.js';
import { pageSignUp } from '../pages.js';
import { jget } from '../modules/jfetch';
import { apiInitialRates, apiRates } from '../api';
import './App.scss';

export default class App extends Component {
    constructor() {
        super();
        this.dispatch = useDispatch();
        this.dispatch(fetchUserData(() => this.redirect(...pageSignUp())));
        this.interval = false;

        jget(apiInitialRates()).then(response => {
            this.dispatch(setInitialCurrency(response.data));
        });
    }

    fetchRates() {
        jget(apiRates())
            .then(response => {
                this.dispatch(setCurrency(response.data));
            })
            .catch(() => {
                this.setState({ error: 'Что-то пошло не так(' });
            });
    }

    subscribe() {
        if (this.interval) {
            return;
        }
        if (this.useSelector(store => store.user.userData)) {
            this.fetchRates();
            this.interval = setInterval(() => this.fetchRates(), 60000);
        }
    }

    clear() {
        super.clear();
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        this.subscribe();

        return this.create(
            `
        <div>
            <Header/>
            <div class="content">
              <MainContent/>
            </div>
        </div>
        `,
            {
                Header: [Header, {}],
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
                            {
                                path: '/signin',
                                component: SignIn,
                                exact: true,
                            },
                            {
                                path: '/signup',
                                component: SignUp,
                                exact: true,
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
                            {
                                path: '/profile',
                                component: Bag,
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

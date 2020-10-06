import {Component, Router, Switch} from "../modules/Softer/Softer.js";
import {Header} from "./Header/Header.js";
import {SignUp} from "./SignUp/SignUp.js";
import SignIn from "./SignIn/SignIn.js";
import MainPage from "./MainPage/MainPage.js";
import Page404 from "./Page404/Page404.js";
import Profile from "./Profile/Profile.js";
import {useDispatch} from "../modules/Softer/softer-softex.js";
import {fetchUserData} from "../store/actions.js";
import {pageSignUp} from "../pages.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.Header = this.place(Header);
        this.mainPageRouter = this.place(Router, {path: '/', component: MainPage, exact: true, authRequired: true});
        this.signInRouter = this.place(Router, {path: '/signin', component: SignIn, exact: true});
        this.signUpRouter = this.place(Router, {path: '/signup', component: SignUp, exact: true});
        this.profile = this.place(Router, {path: `\/profile.*`, component: Profile, authRequired: true});
        this.page404 = this.place(Router, {component: Page404});

        const dispatch = useDispatch();
        dispatch(fetchUserData(() => this.redirect(...pageSignUp())));
    }

    render() {
        const data = this.useSelector(state => state.user.userData);
        const loading = this.useSelector(state => state.app.loading);

        const [app, replace] = this.create('div', `
        <Header></Header>
        ${(loading && !data) ? `<h2>Загрузка...</h2>` : `<MainContent></MainContent>`}
        `); 

        replace({
            Header: this.Header.render(),
        })

        if (loading) {
            return app;
        }

        replace({
            MainContent: new Switch(
                this.mainPageRouter,
                this.signInRouter,
                this.signUpRouter,
                this.profile,
                this.page404
            ).render()
        })

        return app;
    }
}

import {Component, Router, Switch} from "../modules/Softer/Softer.js";
import {Header} from "./Header/Header.js";
import {SignUp} from "./SignUp/SignUp.js";
import MainPage from "./MainPage/MainPage.js";
import SignIn from "./SignIn/SignIn.js";
import Page404 from "./Page404/Page404.js";
import Profile from "./Profile/Profile.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.Header = this.place(Header);
        this.mainPageRouter = this.place(Router, {path: '/', component: MainPage, exact: true});
        this.signInRouter = this.place(Router, {path:'/signin', component: SignIn, exact: true});
        this.signUpRouter = this.place(Router, {path:'/signup', component: SignUp, exact: true});
        this.profile = this.place(Router, {path:`\/profile.*`, component: Profile});
        this.page404 = this.place(Router, {component: Page404});
    }

    render() {
        const [app, replace] = this.create('div', `
        <Header></Header>
        <MainContent></MainContent>
        `);

        replace({
            Header: this.Header.render(),
            MainContent: new Switch(
                this.mainPageRouter,
                this.profile,
                this.signInRouter,
                this.signUpRouter,
                this.page404
            ).render()
        })

        return app;
    }
}

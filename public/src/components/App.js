import {Component, Router, Switch} from "../modules/Softer/Softer.js";
import {Header} from "./Header/Header.js";
import {SignUp} from "./SignUp/SignUp.js";
import MainPage from "./MainPage/MainPage.js";
import SignIn from "./SignIn/SignIn.js";
import Page404 from "./Page404/Page404.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.Header = this.place(Header);
        this.mainPageRouter = this.place(Router, {path: '/', component: MainPage});
        this.signInRouter = this.place(Router, {path:'/signin', component: SignIn});
        this.signUpRouter = this.place(Router, {path:'/signup', component: SignUp});
        this.page404 = this.place(Router, {component: Page404});
    }

    render() {
        return [this.Header.render(),
            new Switch(
                this.mainPageRouter,
                this.signInRouter,
                this.signUpRouter,
                this.page404
            )
        ]
    }
}

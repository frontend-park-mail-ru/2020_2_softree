import {Component, Router, Switch} from "../modules/Softer/Softer.js";
import {Header} from "./Header/Header.js";
import {SignUp} from "./SignUp/SignUp.js";
import MainPage from "./MainPage/MainPage.js";
import SignIn from "./SignIn/SignIn.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.Header = this.place(Header);
        this.mainPageRouter = this.place(Router, {path: '/', component: MainPage});
        this.signInRouter = this.place(Router, {path:'/signin', component: SignIn});
        this.signUpRouter = this.place(Router, {path:'/signup', component: SignUp});
    }

    render() {
        return [this.Header.render(),
            new Switch(
                this.mainPageRouter,
                this.signInRouter,
                this.signUpRouter
            )
        ]
    }
}

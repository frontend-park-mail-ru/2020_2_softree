import {Component, Router, Switch} from "../modules/Softer/Softer.js";
import {Header} from "./Header/Header.js";
import {SignUp} from "./SignUp/SignUp.js";
import MainPage from "./MainPage/MainPage.js";
import SignIn from "./SignIn/SignIn.js";

export default class App extends Component {
    constructor() {
        super();
        this.Header = new Header()
        this.mainPageRouter = new Router('/', MainPage);
        this.signInRouter = new Router('/signin', SignIn);
        this.signUpRouter = new Router('/signup', SignUp);
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

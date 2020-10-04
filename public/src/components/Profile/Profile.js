import {Component, Router, Switch} from "../../modules/Softer/Softer.js";
import Menu from "./Menu.js";
import ProfileMain from "./ProfileMain.js";
import ProfileHistory from "./ProfileHistory.js";
import ProfileSettings from "./ProfileSettings.js";
import Page404 from "../Page404/Page404.js";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.menu = this.place(Menu);
        this.mainProfileRouter = this.place(Router, {path: '/profile', component: ProfileMain, exact: true});
        this.settingsProfileRouter = this.place(Router, {path: '/profile/settings', component: ProfileSettings, exact: true});
        this.historyProfileRouter = this.place(Router, {path: '/profile/history', component: ProfileHistory, exact: true});
        this.page404 = this.place(Router, {component: Page404});
    }

    render() {
        const [page, replace] = this.create('div', `
        <Menu></Menu>
        <ProfilePage></ProfilePage>
        `)

        replace({
            Menu: this.menu.render(),
            ProfilePage: new Switch(
                this.mainProfileRouter,
                this.settingsProfileRouter,
                this.historyProfileRouter,
                this.page404
            ).render()
        })
        return page;
    }
}

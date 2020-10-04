import {Component, Router, Switch} from "../../modules/Softer/Softer.js";
import Menu from "./Menu.js";
import ProfileMain from "./ProfileMain.js";
import ProfileHistory from "./ProfileHistory.js";
import ProfileSettings from "./ProfileSettings.js";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.menu = this.place(Menu);
        this.mainProfileRouter = this.place(Router, {path: '/profile', component: ProfileMain});
        this.settingsProfileRouter = this.place(Router, {path: '/profile/settings', component: ProfileSettings});
        this.historyProfileRouter = this.place(Router, {path: '/profile/history', component: ProfileHistory});
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
                this.historyProfileRouter
            ).render()
        })
        return page;
    }
}

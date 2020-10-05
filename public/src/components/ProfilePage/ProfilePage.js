import {Component, Router, Switch} from "../../modules/Softer/Softer.js";
import Menu from "./Menu/Menu.js"
import History from "./History/History.js"
import Settings from "./Settings/Settings.js"
import Bag from "./Bag/Bag.js"

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.history = this.place(Router, {path:'/profile/history', component: History});
        this.settings = this.place(Router, {path:'/profile/settings', component: Settings});
        this.menu = this.place(Menu);
    }

    render() {
        return [this.menu.render()]
    }
}

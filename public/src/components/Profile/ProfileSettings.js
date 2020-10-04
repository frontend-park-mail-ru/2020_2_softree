import {Component} from "../../modules/Softer/Softer.js";

export default class ProfileSettings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const [page] = this.create('div', `
        <div>Settings page profile</div>
        `)

        return page;
    }
}

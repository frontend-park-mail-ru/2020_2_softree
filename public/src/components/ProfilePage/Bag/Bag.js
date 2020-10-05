import {Component} from "../../../modules/Softer/Softer.js";

export default class Bag extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.appId)
        const [menu, replace, listen] = this.create('div', `
            <a>History</a>`);
        return menu
    }
}

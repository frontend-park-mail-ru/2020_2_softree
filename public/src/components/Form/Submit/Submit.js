import {Component} from "../../../modules/Softer/Softer.js";

export default class Submit extends Component {
    constructor(title) {
        super();
        this.title = title;
    }

    render() {
        const [submit] = this.create('input');
        submit.type = 'submit';
        submit.value = this.title;
        return submit;
    }
}

import {Component} from "../../../modules/Softer/Softer.js";

export default class Submit extends Component {
    constructor(title) {
        super();
        this.title = title;

        this.includeCSS({path: 'Form/Submit'});
    }

    render() {
        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = this.title;
        return submit;
    }
}

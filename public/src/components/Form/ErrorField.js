import {Component} from "../../modules/Softer/Softer.js";

export default class ErrorField extends Component {
    constructor(errors) {
        super();

        this.errors = errors;
    }

    render() {
        const [field] = this.create('div',`
        <p class="grid-field__error">${this.errors.join(' ')}</p>
        `);

        return field;
    }
}

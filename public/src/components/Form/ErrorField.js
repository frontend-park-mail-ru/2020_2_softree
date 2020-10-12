import { Component } from '../../modules/Softer/Softer.js';

export default class ErrorField extends Component {
    constructor(errors) {
        super();

        this.errors = errors;
    }

    render() {
        return this.create( `<p class='grid-field__error'>${this.errors.join(' ')}</p>`);
    }
}

import { Component } from '../../../modules/Softer/Softer.js';

export default class ErrorField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.create(`<p class='field__error'>${[this.props].join(' ')}</p>`);
    }
}

import { Component } from '../../../modules/Softer/Softer.js';

export default class ErrorField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.create(`<p class='grid-field__error'>${this.props.join('<br>')}</p>`);
    }
}

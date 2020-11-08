import { Component } from '../../modules/Softer/Softer.js';

export default class ErrorField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return this.create(`<p class='grid-field__error'>${this.props.join(' ')}</p>`);
    }
}

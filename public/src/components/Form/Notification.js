import {Component} from '../../modules/Softer/Softer.js';

export default class Notification extends Component {
    constructor(msg) {
        super();

        this.errors = msg;
    }

    render() {
        const [field] = this.create('div',`
        <p class='form__notification'>${this.msg.join(' ')}</p>
        `);

        return field;
    }
}

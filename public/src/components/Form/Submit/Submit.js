import { Component } from '../../../modules/Softer/Softer.js';

export default class Submit extends Component {
    constructor(title) {
        super();
        this.title = title;
    }

    render() {
        return this.create(
            `<input type='submit' class='submit-button' value='${this.title}'/>`,
        );
    }
}

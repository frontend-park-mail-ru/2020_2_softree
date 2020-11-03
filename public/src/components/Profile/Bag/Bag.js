import { Component } from '../../../modules/Softer/Softer.js';

export default class Bag extends Component {
    constructor() {
        super();
    }

    render() {
        return this.create(`
        <div class="container">
            <h2 class='block-title'>Портфель</h2>
        </div>`);
    }
}

import { Component } from '../../modules/Softer/Softer.js';

export default class ProfileHistory extends Component {
    constructor() {
        super();
    }

    render() {
        const [page] = this.create( `
        <div>History page profile</div>
        `);

        return page;
    }
}

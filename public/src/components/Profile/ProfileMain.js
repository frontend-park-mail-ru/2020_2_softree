import { Component } from '../../modules/Softer/Softer.js';

export default class ProfileMain extends Component {
    constructor() {
        super();
    }

    render() {
        const [page] = this.create( `
        <div>Main page profile</div>
        `);

        return page;
    }
}

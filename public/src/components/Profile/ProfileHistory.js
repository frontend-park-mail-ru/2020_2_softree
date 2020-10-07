import { Component } from '../../modules/Softer/Softer.js';

export default class ProfileHistory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const [page] = this.create('div', `
        <div>History page profile</div>
        `);

        return page;
    }
}

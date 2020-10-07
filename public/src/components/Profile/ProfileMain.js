import {Component} from '../../modules/Softer/Softer.js';

export default class ProfileMain extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const [page] = this.create('div', `
        <div>Main page profile</div>
        `)

        return page;
    }
}

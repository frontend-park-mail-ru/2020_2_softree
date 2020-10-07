import {Component} from '../../modules/Softer/Softer.js';

export default class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const [menu] = this.create('div', `
        <div class='b1-link'>button 1</div>
        <div class='b2-link'>button 2</div>
        <div class='b3-link'>button 3</div>
        `)
        this.link('.b1-link', 'Main', '/profile');
        this.link('.b2-link', 'Settings', '/profile/settings');
        this.link('.b3-link', 'History', '/profile/history');

        return menu;
    }
}

import { Component } from '../../modules/Softer/Softer.js';
import { pageProfile, pageHistory } from '../../pages.js';

export default class Menu extends Component {
    constructor() {
        super();
    }

    render() {
        const menu = this.create(`
        <div>
            <div class="flex-menu">
                <div class="flex-left">
                    <div class="b1-link btn">Портфель</div>
                    <div class="b2-link btn">История</div>
                </div>1rs
            </div>
        </div>
        `);

        this.link('.b1-link', ...pageProfile());
        this.link('.b2-link', ...pageHistory());

        return menu;
    }
}

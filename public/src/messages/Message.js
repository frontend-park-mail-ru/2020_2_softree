import { Component } from '../modules/Softer/Softer.js';
import Styler from '../modules/Styler.js';
import './Message.css';
import { msgTypes } from './types';

export class Message extends Component {
    constructor() {
        super();
    }

    render() {
        const message = this.useSelector(store => store.message);

        let color;
        switch (message.type) {
            case msgTypes.FAIL:
                color = '#ff7575';
                break;
            case msgTypes.SUCCESS:
                color = '#99ff7c';
                break;
            case msgTypes.NEUTRAL:
                color = 'white';
        }

        const style = {
            background: color,
            transform: message.isShowed ? 'translate(0, 0)' : '',
        };

        return this.create(`
        <div class="message" style="${Styler(style)}">
            <div class="message-content">${message.message}</div> 
        </div>
        `);
    }
}

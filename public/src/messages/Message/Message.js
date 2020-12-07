import { Component } from '../../modules/Softer/Softer.js';
import Styler from '../../modules/Styler.js';
import './Message.css';
import { msgTypes } from '../types';

export class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let color;
        switch (this.props.type) {
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
        };

        return this.create(`
        <div class="message" style="${Styler(style)}">
            <div class="message-content">${this.props.message}</div> 
        </div>
        `);
    }
}

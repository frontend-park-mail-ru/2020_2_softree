import {Component} from "../modules/Softer/Softer.js";
import Styler from "../modules/Styler.js";
import {msgTypeFail, msgTypeNeutral, msgTypeSuccess} from "./types.js";

export class Message extends Component {
    constructor() {
        super();
    }

    render() {
        const message = this.useSelector(store => store.message);

        let color;
        switch (message.type) {
            case msgTypeFail:
                color = "#ff7575";
                break;
            case msgTypeSuccess:
                color = "#99ff7c";
                break;
            case msgTypeNeutral:
                color = "white";
        }

        const style = {
            background: color,
            transform : message.isShowed ? "translate(0, 0)" : "",
        }

        const [element] = this.create( `
        <div class="message" style="${Styler(style)}">
            <div class="message-content">${message.message}</div> 
        </div>
        `)

        return element;
    }
}

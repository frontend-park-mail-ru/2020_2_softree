import { Component } from "../modules/Softer/Softer";
import { Message } from "./Message/Message";

import "./Messages.scss";

export default class Messages extends Component {
    render() {
        const messages = this.useSelector(store => store.message.messages);

        return this.create(`
        <div class="message-stack">
          <Messages/>
        </div>
        `, {
            Messages: [Message, messages]
        })
    }
}

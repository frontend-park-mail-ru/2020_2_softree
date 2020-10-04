import {Component} from "../../modules/Softer/Softer.js";
import Submit from "../../components/Form/Submit/Submit.js";

export default class ProfilePage extends Component {
    constructor() {
        super();
        this.Submit = new Submit();
    }

    render() {
        const hello = document.createElement('div')
        hello.innerHTML = "HELLO, This is Profile";
        return [this.Submit.render, hello
        ]
    }
}



import {Component} from "../../modules/Softer/Softer.js";

export default class MainPage extends Component {

    render() {
        const hello = document.createElement('div')
        hello.innerHTML = "HELLO, This is main page";
        return hello;
    }
}

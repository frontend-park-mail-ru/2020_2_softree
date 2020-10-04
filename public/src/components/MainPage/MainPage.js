import {Component} from "../../modules/Softer/Softer.js";

export default class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
<<<<<<< HEAD
        const hello = document.createElement('div')
        hello.innerHTML = "HELLO, This is main page";
        return hello;
=======
        const [page] = this.create('div', `
        
        `)


        return page;
>>>>>>> mark
    }
}

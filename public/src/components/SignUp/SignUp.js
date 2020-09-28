import {Component} from "../../modules/Softer/Softer.js";
import GridField from "../Form/GridField/GridField.js";
import Submit from "../Form/Submit/Submit.js";

export class SignUp extends Component {
    constructor() {
        super();
        this.fields = [
            {title: 'Email', type: 'email', name: 'name'},
            {title: 'Пароль', type: 'password', name: 'password'},
            {title: 'Повторите пароль', type: 'password', name: 'password2'}
        ];

    }

    render() {
        const signUp = document.createElement('div')
        const fields = this.fields.map(field => new GridField({...field, gridTemplate: '80px 1fr'}));

        signUp.innerHTML = `
    <div class="hidden-wrapper">
        <div class="modal">
            <h2 class="modal__title">Добро пожаловать!</h2>
            <form class="grid-form">
            </form> 
        </div> 
    </div> 
    `;

        const form = signUp.querySelector('.grid-form');
        form.append(...fields.map(field => field.render()));
        form.appendChild(new Submit('Зарегистрироваться').render());
        return signUp;
    }
}

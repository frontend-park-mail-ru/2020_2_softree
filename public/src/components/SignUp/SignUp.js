import {Component} from "../../modules/Softer/Softer.js";
import GridField from "../Form/GridField/GridField.js";
import Submit from "../Form/Submit/Submit.js";

export class SignUp extends Component {
    constructor() {
        super(null);
        this.fields = [
            {title: 'Email', type: 'email', name: 'email'},
            {title: 'Пароль', type: 'password', name: 'password'},
            {title: 'Повторите пароль', type: 'password', name: 'password2'}
        ];
        this.dataState = {
            email: '',
            password: '',
            password2: ''
        };
    }

    submit(e) {
       e.preventDefault();
       console.log(this.dataState);
    }

    render() {
        const signUp = document.createElement('div')
        const fields = this.fields.map(field => new GridField({...field, value: this.dataState[field.name], gridTemplate: '80px 1fr', dataHandler: this.setDataState.bind(this)}));

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
        form.addEventListener('submit', e => this.submit(e))
        return signUp;
    }
}

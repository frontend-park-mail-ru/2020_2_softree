import {Component, softCreate} from "../../modules/Softer/Softer.js";
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
        const [signUp, replace, listen] = softCreate('div', `
        <div class="hidden-wrapper">
            <div class="modal">
                <h2 class="modal__title">Добро пожаловать!</h2>
                <form class="grid-form">
                    <GridFields></GridFields>
                    <SubmitButton></SubmitButton>
                </form> 
            </div> 
        </div>`);

        const fields = this.fields.map(field =>
            new GridField({
                ...field,
                value: this.dataState[field.name],
                gridTemplate: '80px 1fr',
                dataHandler: this.setDataState.bind(this)
            }));

        replace('GridFields', ...fields.map(field => field.render()));
        replace('SubmitButton', new Submit('Зарегистрироваться').render());
        listen('form', 'submit', e => this.submit(e));

        return signUp;
    }
}

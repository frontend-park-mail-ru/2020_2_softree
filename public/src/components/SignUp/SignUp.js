import {Component} from "../../modules/Softer/Softer.js";
import GridField from "../Form/GridField/GridField.js";
import Submit from "../Form/Submit/Submit.js";

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.fields = [
            {title: 'Email', type: 'email', name: 'email'},
            {title: 'Пароль', type: 'password', name: 'password'},
            {title: 'Повторите пароль', type: 'password', name: 'password2'}
        ];
        this.data = {
            email: '',
            password: '',
            password2: ''
        };
    }

    submit(e) {
        e.preventDefault();
        console.log(this.data);
    }

    render() {
        const [signUp, replace, listen] = this.create('div', `
        <div class="hidden-wrapper">
            <div class="modal auth">
                <h2 class="modal__title">Добро пожаловать!</h2>
                <form class="grid-form">
                    <GridFields></GridFields>
                    <SubmitButton></SubmitButton>
                </form> 
                <a class="signin-link" href="/signin">Уже есть аккаунт?</a>
            </div> 
        </div>`);

        const fields = this.fields.map(field =>
            new GridField({props:{
                ...field,
                value: this.data[field.name],
                gridTemplate: '80px 200px',
                dataHandler: this.setData.bind(this)
            }}));

        replace({
            GridFields: fields.map(field => field.render()),
            SubmitButton: new Submit('Зарегистрироваться').render()
        })

        listen('form', 'submit', e => this.submit(e));
        this.link('.signin-link', 'Авторизация', '/signin')

        return signUp;
    }
}

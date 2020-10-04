import {Component} from "../../modules/Softer/Softer.js";
import GridField from "../Form/GridField/GridField.js";
import Submit from "../Form/Submit/Submit.js";
import {useDispatch} from "../../modules/Softer/softer-softex.js";

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.fields = [
            {title: 'Email', type: 'email', name: 'email'},
            {title: 'Пароль', type: 'password', name: 'password'},
        ];
        this.data = {
            email: '',
            password: '',
        };

    }

    submit(e) {
        e.preventDefault();
        console.log(this.data);
    }

    render() {
        const [signIn, replace, listen] = this.create('div', `
        <div class="hidden-wrapper">
            <div class="modal auth">
                <h2 class="modal__title">Здравствуйте!</h2>
                <h2>Loading: ${loading}</h2>
                <form class="grid-form">
                    <GridFields></GridFields>
                    
                    <div class="modal__bottom-wrapper">
                        <a class="forgot-link" href="/forgot-password">Заыбли пароль?</a>
                        <SubmitButton></SubmitButton>
                    </div>
                </form> 
                <a class="signup-link" style="margin-top: 20px" href="/signup">Еще нет аккаунта?</a>
            </div> 
        </div>`);

        const fields = this.fields.map(field =>
            new GridField({props:{
                    ...field,
                    value: this.data[field.name],
                    gridTemplate: '60px 200px',
                    dataHandler: this.setData.bind(this)
                }}));

        replace({
            GridFields: fields.map(field => field.render()),
            SubmitButton: new Submit('Войти').render()
        })

        listen('form', 'submit', e => this.submit(e));
        this.link('.signup-link', 'Регистрация', '/signup');
        this.link('.forgot-link', 'Забыли пароль', '/forgot-password');

        return signIn;
    }
}

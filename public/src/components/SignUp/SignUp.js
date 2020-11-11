import { Component } from '../../modules/Softer/Softer.js';
import GridField from '../Form/GridField/GridField.js';
import Submit from '../Form/Submit/Submit.js';
import { jpost } from '../../modules/jfetch.js';
import { apiSignUp } from '../../api.js';
import { pageMain, pageSignIn } from '../../pages.js';
import ErrorField from '../Form/ErrorField.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { setUserData } from '../../store/actions.js';
import './SignUp.css';

export class SignUp extends Component {
    constructor() {
        super();
        this.fields = [
            { title: 'Email', type: 'email', name: 'email' },
            { title: 'Пароль', type: 'password', name: 'password1' },
            { title: 'Повторите пароль', type: 'password', name: 'password2' },
        ];
    }

    initState() {
        return { errors: {} };
    }

    initData() {
        return {
            email: '',
            password1: '',
            password2: '',
        };
    }

    submit(e) {
        e.preventDefault();
        jpost(apiSignUp(), { email: this.data.email, password: this.data.password1 })
            .then(() => {
                useDispatch()(setUserData({ ...this.data, password1: '', password2: '' }));
                this.redirect(...pageMain());
            })
            .catch(({ data }) => {
                console.log(data);
                this.setState({ errors: data });
            });
    }

    render() {
        const { errors } = this.state;
        const signUp = this.create(
            `
        <div>
            <div class='hidden-wrapper'>
                <div class='modal auth'>
                    <h2 class='modal__title'>Добро пожаловать!</h2>
                    <form class='grid-form'>
                        <GridFields/>
                        ${errors.non_field_errors ? '<ErrorField/>' : ''}
                        <SubmitButton/>
                    </form> 
                    <a class='signin-link' href='/signin'>Уже есть аккаунт?</a>
                </div> 
            </div>
        </div>`,
            {
                GridFields: [
                    GridField,
                    this.fields.map(field => ({
                        ...field,
                        errors: errors[field.name],
                        required: true,
                        value: this.data[field.name],
                        gridTemplate: '80px 200px',
                        dataHandler: this.setData.bind(this),
                    })),
                ],
                SubmitButton: [Submit, 'Зарегистрироваться'],
                ErrorField: [ErrorField, [errors.non_field_errors]],
            },
        );

        this.listen('form', 'submit', e => this.submit(e));
        this.link('.signin-link', ...pageSignIn());

        return signUp;
    }
}

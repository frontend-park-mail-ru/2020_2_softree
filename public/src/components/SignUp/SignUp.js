import { Component } from '../../modules/Softer/Softer.js';
import GridField from '../UI/Form/GridField/GridField.js';
import Submit from '../UI/Form/Submit/Submit.js';
import { jpost } from '../../modules/jfetch.js';
import { apiSignUp } from '../../api.js';
import { pageMain, pageSignIn } from '../../pages.js';
import ErrorField from '../UI/Form/ErrorField.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { setUserData } from '../../store/actions.js';
import Validator from '../../modules/validator/validator.js';
import './SignUp.scss';

export class SignUp extends Component {
    constructor() {
        super();
        this.fields = [
            { title: 'Email', type: 'email', name: 'email' },
            { title: 'Пароль', type: 'password', name: 'password1' },
            { title: 'Повторите пароль', type: 'password', name: 'password2' },
        ];
        this.validator = new Validator();
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

        const errors = {
            ...this.validator.validateEmail('email', this.data.email),
            ...this.validator.validatePasswords('password1', this.data.password1),
            ...this.validator.validatePasswords('password2', this.data.password2),
            ...this.validator.comparePasswords('non_field_errors', this.data.password1, this.data.password2),
        };
        console.log(errors, Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            console.log(errors);
            this.setState({ errors: { ...errors } });
            return;
        }

        jpost(apiSignUp(), { email: this.data.email, password: this.data.password1 })
            .then(() => {
                useDispatch()(setUserData({ ...this.data, password1: '', password2: '' }));
                this.redirect(...pageMain());
            })
            .catch(({ data }) => {
                this.setState({ errors: data || {} });
            });
    }

    render() {
        const { errors } = this.state;
        const signUp = this.create(
            `
            <div class='hidden-wrapper'>
                <div class='modal'>
                    <h2 class='modal__title'>Добро пожаловать!</h2>
                    <form class='grid-form' novalidate>
                        <GridFields/>
                        ${errors.non_field_errors ? '<ErrorField/>' : ''}
                        <Submit/>
                    </form> 
                    <a class='signin-link' href='/signin'>Уже есть аккаунт?</a>
                </div> 
            </div>
        `,
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
                Submit: [Submit, 'Зарегистрироваться'],
                ErrorField: [ErrorField, [errors.non_field_errors]],
            },
        );

        this.listen('form', 'submit', e => this.submit(e));
        this.link('.signin-link', ...pageSignIn());

        return signUp;
    }
}

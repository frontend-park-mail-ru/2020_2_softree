import { Component } from '../../modules/Softer/Softer.js';
import GridField from '../UI/Form/GridField/GridField.js';
import Submit from '../UI/Form/Submit/Submit.js';
import { jpost } from '../../modules/jfetch.js';
import { apiSignIn } from '../../api.js';
import { pageForgotPassword, pageMain, pageSignUp } from '../../pages.js';
import ErrorField from '../UI/Form/ErrorField.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { setUserData } from '../../store/actions.js';
import Validator from '../../modules/validator/validator.js';

export default class SignIn extends Component {
    constructor() {
        super();
        this.fields = [
            { title: 'Email', type: 'email', name: 'email' },
            { title: 'Пароль', type: 'password', name: 'password' },
        ];
        this.validator = new Validator();
    }

    initState() {
        return { errors: {} };
    }

    initData() {
        return {
            email: '',
            password: '',
        };
    }

    submit(e) {
        e.preventDefault();

        const errors = {
            ...this.validator.validateEmail('email', this.data.email),
            ...this.validator.validatePasswords('password', this.data.password1),
        };
        if (Object.values(errors).length > 0) {
            this.setState({ errors: { ...errors } });
            return;
        }

        jpost(apiSignIn(), this.data)
            .then(({ data }) => {
                useDispatch()(setUserData(data));
                this.redirect(...pageMain());
            })
            .catch(() => this.setState({ errors: { non_field_errors: ['Пароль или Email не подходит'] } }));
    }

    render() {
        const { errors } = this.state;
        const signIn = this.create(
            `
            <div class='hidden-wrapper'>
                <div class='modal'>
                    <h2 class='modal__title'>Здравствуйте!</h2>
                    <form class='grid-form' novalidate>
                        <GridFields/>
                        ${errors.non_field_errors ? '<ErrorField/>' : ''}
                        <div class='modal__bottom-wrapper'>
                            <a class='forgot-link' href='/forgot-password'>Забыли пароль?</a>
                            <SubmitButton/>
                        </div>
                    </form> 
                    <a class='signup-link' style='margin-top: 20px' href='/signup'>Еще нет аккаунта?</a>
                </div> 
            </div>
        `,
            {
                GridFields: [
                    GridField,
                    this.fields.map(field => ({
                        ...field,
                        errors: errors[field.name],
                        value: this.data[field.name],
                        gridTemplate: '60px 200px',
                        required: true,
                        dataHandler: this.setData.bind(this),
                    })),
                ],
                SubmitButton: [Submit, 'Войти'],
                ErrorField: [ErrorField, [errors.non_field_errors]],
            },
        );

        this.listen('form', 'submit', e => this.submit(e));
        this.link('.signup-link', ...pageSignUp());
        this.link('.forgot-link', ...pageForgotPassword());

        return signIn;
    }
}

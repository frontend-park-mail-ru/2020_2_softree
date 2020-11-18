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
        return { errors: null };
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

        const errors = this.validator.validateEmail(this.data.email);
        errors.push(...this.validator.validatePasswords([this.data.password1, this.data.password2]));
        errors.push(...this.validator.comparePasswords(this.data.password1, this.data.password2));
        console.log('check', ...errors);
        if (errors.length > 0) {
            this.setState({ errors: errors || {} });
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
                        ${errors ? '<Error/>' : ''}
                        <GridFields/>
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
                        required: true,
                        value: this.data[field.name],
                        gridTemplate: '80px 200px',
                        dataHandler: this.setData.bind(this),
                    })),
                ],
                Submit: [Submit, 'Зарегистрироваться'],
                Error: [ErrorField, [errors]],
            },
        );

        this.listen('form', 'submit', e => this.submit(e));
        this.link('.signin-link', ...pageSignIn());

        return signUp;
    }
}

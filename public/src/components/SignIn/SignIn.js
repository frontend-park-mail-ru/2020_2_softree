import { Component } from '../../modules/Softer/Softer.js';
import GridField from '../Form/GridField/GridField.js';
import Submit from '../Form/Submit/Submit.js';
import { jpost } from '../../modules/jfetch.js';
import { apiSignIn } from '../../api.js';
import { pageForgotPassword, pageMain, pageSignUp } from '../../pages.js';
import ErrorField from '../Form/ErrorField.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { setUserData } from '../../store/actions.js';

export default class SignIn extends Component {
    constructor() {
        super();
        this.fields = [
            { title: 'Email', type: 'email', name: 'email' },
            { title: 'Пароль', type: 'password', name: 'password' },
        ];
    }

    initState() {
        return {
            errors: null,
        };
    }

    initData() {
        return {
            email: '',
            password: '',
        };
    }

    submit(e) {
        e.preventDefault();
        jpost(apiSignIn(), this.data)
            .then(({ data }) => {
                useDispatch()(setUserData(data));
                this.redirect(...pageMain());
            })
            .catch(() =>
                this.setState({ errors: ['Пароль или Email не подходит'] }),
            );
    }

    render() {
        const { errors } = this.state;
        const signIn = this.create(
            `
        <div>
            <div class='hidden-wrapper'>
                <div class='modal auth'>
                    <h2 class='modal__title'>Здравствуйте!</h2>
                    <form class='grid-form'>
                    ${errors ? '<Error/>' : ''}
                        <GridFields/>
                        <div class='modal__bottom-wrapper'>
                            <a class='forgot-link' href='/forgot-password'>Забыли пароль?</a>
                            <SubmitButton/>
                        </div>
                    </form> 
                    <a class='signup-link' style='margin-top: 20px' href='/signup'>Еще нет аккаунта?</a>
                </div> 
            </div>
        </div> `,
            {
                GridFields: [
                    GridField,
                    this.fields.map(field => ({
                        ...field,
                        value: this.data[field.name],
                        gridTemplate: '60px 200px',
                        required: true,
                        dataHandler: this.setData.bind(this),
                    })),
                ],
                SubmitButton: [Submit, 'Войти'],
                Error: [ErrorField, [errors]],
            },
        );

        this.listen('form', 'submit', e => this.submit(e));
        this.link('.signup-link', ...pageSignUp());
        this.link('.forgot-link', ...pageForgotPassword());

        return signIn;
    }
}

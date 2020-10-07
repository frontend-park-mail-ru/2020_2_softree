import {Component} from '../../modules/Softer/Softer.js';
import GridField from '../Form/GridField/GridField.js';
import Submit from '../Form/Submit/Submit.js';
import {jpost} from '../../modules/jfetch.js';
import {apiSignIn} from '../../api.js';
import {pageForgotPassword, pageMain, pageSignUp} from '../../pages.js';
import ErrorField from '../Form/ErrorField.js';
import {useDispatch} from '../../modules/Softer/softer-softex.js';
import {setUserData} from '../../store/actions.js';

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

        this.state = {
            errors: null
        }
    }

    submit(e) {
        e.preventDefault();
        jpost(apiSignIn(), this.data)
            .then(({data}) => {
                useDispatch()(setUserData(data));
                this.redirect(...pageMain());
            })
            .catch(() => this.setState({errors: ['Пароль или Email не подходит']}))
    }

    render() {
        const {errors} = this.state;
        const [signIn, replace, listen] = this.create('div', `
        <div class='hidden-wrapper'>
            <div class='modal auth'>
                <h2 class='modal__title'>Здравствуйте!</h2>
                <form class='grid-form'>
                ${errors ? `<Error></Error>` : ''}
                    <GridFields></GridFields>
                    <div class='modal__bottom-wrapper'>
                        <a class='forgot-link' href='/forgot-password'>Забыли пароль?</a>
                        <SubmitButton></SubmitButton>
                    </div>
                </form> 
                <a class='signup-link' style='margin-top: 20px' href='/signup'>Еще нет аккаунта?</a>
            </div> 
        </div>`);

        const fields = this.fields.map(field =>
            new GridField({
                props: {
                    ...field,
                    value: this.data[field.name],
                    gridTemplate: '60px 200px',
                    required: true,
                    dataHandler: this.setData.bind(this)
                }
            }));

        replace({
            GridFields: fields.map(field => field.render()),
            SubmitButton: new Submit('Войти').render(),
        })

        if (errors) {
            replace({
                Error: new ErrorField(errors).render(),
            })
        }

        listen('form', 'submit', e => this.submit(e));
        this.link('.signup-link', ...pageSignUp());
        this.link('.forgot-link', ...pageForgotPassword());

        return signIn;
    }
}

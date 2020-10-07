import {Component} from '../../modules/Softer/Softer.js';
import GridField from '../Form/GridField/GridField.js';
import Submit from '../Form/Submit/Submit.js';
import {jpost} from '../../modules/jfetch.js';
import {apiSignUp} from '../../api.js';
import {pageMain, pageSignIn} from '../../pages.js';
import ErrorField from '../Form/ErrorField.js';
import {useDispatch} from '../../modules/Softer/softer-softex.js';
import {setUserData} from '../../store/actions.js';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.fields = [
            {title: 'Email', type: 'email', name: 'email'},
            {title: 'Пароль', type: 'password', name: 'password1'},
            {title: 'Повторите пароль', type: 'password', name: 'password2'}
        ];
        this.data = {
            email: '',
            password1: '',
            password2: '',
        };

        this.state = {
            errors: {}
        }
    }

    submit(e) {
        e.preventDefault();
        jpost(apiSignUp(), this.data)
            .then(() => {
                    useDispatch()(setUserData({...this.data, password1: '', password2: ''}));
                    this.redirect(...pageMain());
                })
            .catch(({data}) => this.setState({errors: data}));
    }

    render() {
        const {errors} = this.state;

        const [signUp, replace, listen] = this.create('div', `
        <div class='hidden-wrapper'>
            <div class='modal auth'>
                <h2 class='modal__title'>Добро пожаловать!</h2>
                <form class='grid-form'>
                    <GridFields></GridFields>
                    ${errors['non_field_errors'] ? `<FieldError></FieldError>` : ''}
                    <SubmitButton></SubmitButton>
                </form> 
                <a class='signin-link' href='/signin'>Уже есть аккаунт?</a>
            </div> 
        </div>`);

        const fields = this.fields.map(field =>
            new GridField({props:{
                ...field,
                errors: errors[field.name],
                required: true,
                value: this.data[field.name],
                gridTemplate: '80px 200px',
                dataHandler: this.setData.bind(this)
            }}));

        replace({
            GridFields: fields.map(field => field.render()),
            SubmitButton: new Submit('Зарегистрироваться').render()
        })

        if (errors['non_field_errors']) {
            replace({
                FieldError: new ErrorField(errors['non_field_errors']).render()
            })
        }

        listen('form', 'submit', e => this.submit(e));
        this.link('.signin-link', ...pageSignIn())

        return signUp;
    }
}

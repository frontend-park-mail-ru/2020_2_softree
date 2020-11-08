import { Component } from '../../modules/Softer/Softer.js';
import GridField from '../Form/GridField/GridField.js';
import Submit from '../Form/Submit/Submit.js';
import ErrorField from '../Form/ErrorField.js';

export default class ProfileSettings extends Component {
    constructor() {
        super();
        this.fields = [
            {
                title: 'Текущий пароль',
                type: 'password',
                name: 'oldPassword',
            },
            {
                title: 'Новый пароль',
                type: 'password',
                name: 'newPassword',
            },
            {
                title: 'Повторите пароль',
                type: 'password',
                name: 'repeatPassword',
            },
        ];

        this.data = {
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
        };
    }

    initState() {
        return { errors: {} };
    }

    resetData() {
        this.data = {};
        this.setState({});
    }

    changePass(e) {
        e.preventDefault();
        if (e.newPassword1 !== e.newPassword2) {
            this.setState({ errors: { errors: ['Пароли не совпадают'] } });
            return;
        }

        jpatch(apiChangePass(), this.data)
            .then(({ status }) => {
                if (status === 200) {
                    this.resetData();
                    this.setState({ errors: {} });
                    useDispatch()(showMessage('Пароль успешно обновлен!', msgTypeSuccess));
                }
            })
            .catch(({ data }) => {
                this.data = {};
                this.setState({ errors: data });
            });
    }

    render() {
        const { errors } = this.state;

        const password = this.create(
            `
            <div>
                <form class="password-form">
                    <GridFields/>
                    ${errors['non_field_errors'] ? '<ErrorField/>' : ''}
                    <SubmitButton/>
                </form>
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
                SubmitButton: [Submit, 'Подтвердить'],
                ErrorField: [ErrorField, errors.non_field_errors],
            },
        );

        this.listen('.password-form', 'submit', e => this.changePass(e));
        return password;
    }
}

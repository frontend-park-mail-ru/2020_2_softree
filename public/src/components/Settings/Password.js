import { Component } from '../../modules/Softer/Softer.js';
import GridField from '../Form/GridField/GridField.js';
import Submit from '../Form/Submit/Submit.js';
import ErrorField from '../Form/ErrorField.js';
import { msgTypes } from '../../messages/types';
import { showMessage } from '../../store/actions';
import { useDispatch } from '../../modules/Softer/softer-softex';
import { apiChangePass } from '../../api';
import { jput } from '../../modules/jfetch';

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
        this.__resetState();
    }

    changePass(e) {
        e.preventDefault();
        if (e.newPassword1 !== e.newPassword2) {
            this.setState({ errors: { errors: ['Пароли не совпадают'] } });
            return;
        }

        jput(apiChangePass(), { old_password: this.data.oldPassword, new_password: this.data.newPassword })
            .then(({ status }) => {
                if (status === 200) {
                    this.resetData();
                    useDispatch()(showMessage('Пароль успешно обновлен!', msgTypes.SUCCESS));
                }
            })
            .catch(response => {
                this.setState({ errors: response.data });
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
                    <div class="password-btn">
                        <SubmitButton/>
                    </div>
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
                        gridTemplate: '150px 200px',
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

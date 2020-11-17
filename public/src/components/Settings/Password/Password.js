import { Component } from '../../../modules/Softer/Softer.js';
import GridField from '../../UI/Form/GridField/GridField.js';
import Submit from '../../UI/Form/Submit/Submit.js';
import ErrorField from '../../UI/Form/ErrorField.js';
import { msgTypes } from '../../../messages/types';
import { showMessage } from '../../../store/actions';
import { useDispatch } from '../../../modules/Softer/softer-softex';
import { apiChangePass } from '../../../api';
import { jput } from '../../../modules/jfetch';
import Validator from '../../../modules/validator/validator.js';

import './Password.scss';

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

        this.validator = new Validator();

        this.windowListener = null;
    }

    initState() {
        return {
            showPlaceholders: window.innerWidth < 430,
            errors: {} };
    }

    resetData() {
        this.data = {};
        this.__resetState();
    }


    initWindowListener() {
        if (this.windowListener === null) {
            this.windowListener = e => {
                if (this.state.showPlaceholders) {
                    if (window.innerWidth >= 430) {
                        this.setState({showPlaceholders: false});
                    }
                } else {
                    if (window.innerWidth < 430) {
                        this.setState({showPlaceholders: true});
                    }
                }
            }
            window.addEventListener('resize', this.windowListener);
        }
    }

    clear() {
        super.clear();
        console.log('fuck you clear')
        window.removeEventListener('resize', this.windowListener);
        this.windowListener = null;
    }


    changePass(e) {
        e.preventDefault();
        const errors = this.validator.validatePassword(this.data.newPassword, this.data.repeatPassword);
        if (errors.length > 0) {
            this.setState({ errors: { non_field_errors: errors } });
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
        this.initWindowListener();
        const { errors } = this.state;

        const password = this.create(
            `
            <form class="grid-form password-form" novalidate>
                <GridFields/>
                ${errors['non_field_errors'] ? '<ErrorField/>' : ''}
                <Submit/>
            </form>
            `,
            {
                GridFields: [
                    GridField,
                    this.fields.map(field => ({
                        ...field,
                        errors: errors[field.name],
                        required: true,
                        value: this.data[field.name],
                        gridTemplate: '150px 200px',
                        placeholder: this.state.showPlaceholders && field.title,
                        dataHandler: this.setData.bind(this),
                    })),
                ],
                Submit: [Submit, 'Подтвердить'],
                ErrorField: [ErrorField, [errors.non_field_errors]],
            },
        );

        this.listen('.password-form', 'submit', e => this.changePass(e));
        return password;
    }
}

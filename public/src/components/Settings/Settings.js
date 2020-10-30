import { apiChangePass } from '../../api.js';
import { Component } from '../../modules/Softer/Softer.js';
import ErrorField from '../Form/ErrorField.js';
import Notification from '../Form/Notification.js';
import GridField from '../Form/GridField/GridField.js';
import Submit from '../Form/Submit/Submit.js';
import { setUploadedImage } from '../../utils/utils.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { setPhoto, showMessage } from '../../store/actions.js';
import { jpatch } from '../../modules/jfetch.js';
import { msgTypeSuccess } from '../../messages/types.js';

export default class ProfileSettings extends Component {
    constructor() {
        super();
        this.fields = [
            { title: 'Текущий пароль', type: 'password', name: 'oldPassword' },
            { title: 'Новый пароль', type: 'password', name: 'newPassword1' },
            {
                title: 'Повторите пароль',
                type: 'password',
                name: 'newPassword2',
            },
        ];

        this.data = {
            avatar: '',
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
        };

        this.state = {
            errors: {},
            overalInfoIsOpen: false,
            changePasswordIsOpen: false,
        };
    }

    logOut(e) {
        e.preventDefault();
        jpost(apiLogOut()).catch(({ status }) => {
            if (status === 302) {
                useDispatch()(dropUserData());
                this.redirect(...pageSignIn());
            }
        });
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
                    useDispatch()(
                        showMessage('Пароль успешно обновлен!', msgTypeSuccess),
                    );
                }
            })
            .catch(({ data }) => {
                this.data = {};
                this.setState({ errors: data });
            });
    }

    changePhoto(e) {
        e.preventDefault();
        const dispatch = useDispatch();
        const imgHandler = src => {
            dispatch(setPhoto(src));
        };
        setUploadedImage(e, imgHandler);
    }

    render() {
        const data = this.useSelector(state => state.user.userData);
        const { errors } = this.state;
        this.state.avatar = data.avatar;

        const settings = this.create(
            `
        <div>
            <div class="profile-settings">
                <div class="avatar-container">
                    <img class="avatar" src=${
                        this.state.avatar || '/src/images/avatar.svg'
                    } alt="avatar"/>
                    <div class="email-title">${data.email}</div>
                </div>
                <div class="profile-settings__menu">
                    <div class="btn overal style="background: ${
                        this.state.overalInfoIsOpen ? 'gray' : ''
                    }">Общая информация</div>
                    ${
                        this.state.overalInfoIsOpen
                            ? '<input class="avatar-input" type="file" accept="image/png, image/jpeg">'
                            : ''
                    } 
                    <div class="btn password" style="background: ${
                        this.state.changePasswordIsOpen ? 'gray' : ''
                    }">Изменить пароль</div>
                    ${
                        this.state.changePasswordIsOpen
                            ? `<div class="flexbox">
                            <form class="password-form">
                                <GridFields/>
                                ${
                                    errors['non_field_errors']
                                        ? '<ErrorField/>'
                                        : ''
                                }
                                <SubmitButton/>
                            </form>
                        </div>`
                            : ''
                    }
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
                SubmitButton: [Submit, 'Подтвердить'],
                ErrorField: [ErrorField, errors.non_field_errors],
            },
        );

        this.listen('.password-form', 'submit', e => this.changePass(e));
        this.listen('.avatar-input', 'change', e => this.changePhoto(e));
        this.listen('.btn.password', 'click', () =>
            this.setState({
                changePasswordIsOpen: !this.state.changePasswordIsOpen,
            }),
        );
        this.listen('.btn.overal', 'click', () =>
            this.setState({ overalInfoIsOpen: !this.state.overalInfoIsOpen }),
        );

        return settings;
    }
}

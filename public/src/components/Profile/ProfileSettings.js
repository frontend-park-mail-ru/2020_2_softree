import { apiChangePass } from '../../api.js';
import { Component } from '../../modules/Softer/Softer.js';
import ErrorField from '../Form/ErrorField.js';
import Notification from '../Form/Notification.js';
import GridField from '../Form/GridField/GridField.js';
import Submit from '../Form/Submit/Submit.js';
import { setUploadedImage } from '../../utils/utils.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { setPhoto } from '../../store/actions.js';
import { jpatch } from '../../modules/jfetch.js';

export default class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.fields = [
            { title: 'Текущий пароль', type: 'password', name: 'oldPassword' },
            { title: 'Новый пароль', type: 'password', name: 'newPassword1' },
            { title: 'Повторите пароль', type: 'password', name: 'newPassword2' }
        ];

        this.data = {
            avatar: '',
            oldPassword: '',
            newPassword1: '',
            newPassword2: ''
        };

        this.state = {
            errors: {}
        };
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
                    this.setState({ notification: 'Пароль успешно обновлен' });
                }
            })
            .catch(({ data }) => this.setState({ errors: data }));
    }

    changePhoto(e) {
        e.preventDefault();
        const dispatch = useDispatch();
        const imgHandler = src => dispatch(setPhoto(src));
        setUploadedImage(e, imgHandler);
    }

    render() {
        const data = this.useSelector(state => state.user.userData);
        const { errors } = this.state;
        const notification = this.state.notification;

        const [settings, replace, listen] = this.create('div', `
        <div class="profile-settings">
            <div class="email">
                <div class="email-title">E-mail:</div>
                ${data.email}
            </div>
            <div class="flexbox">
                <div class="avatar-container">
                    <img class="avatar" src=${data.avatar ? data.avatar : '/src/images/avatar.svg'} alt="avatar"/>
                    <input class="avatar-input" type="file" accept="image/png, image/jpeg">
                </div>
                <form class="password-form">
                    <GridFields></GridFields>
                    ${errors.non_field_errors ? '<FieldError></FieldError>' : ''}
                    <SubmitButton></SubmitButton>
                </form>
                    ${notification ? '<Notification></Notification>' : ''}
            </div>
        </div>`);

        const fields = this.fields.map(field =>
            new GridField({
                props: {
                    ...field,
                    errors: errors[field.name],
                    required: true,
                    value: this.data[field.name],
                    gridTemplate: '80px 200px',
                    dataHandler: this.setData.bind(this)
                }
            }));

        replace({
            GridFields: fields.map(field => field.render()),
            SubmitButton: new Submit('Подтвердить').render()
        });

        if (errors.non_field_errors) {
            replace({
                FieldError: new ErrorField(errors.non_field_errors).render()
            });
        }

        if (notification !== undefined) {
            replace({
                Notification: new Notification(notification).render()
            });
        }

        listen('.password-form', 'submit', e => this.changePass(e));
        listen('.avatar-input', 'change', e => this.changePhoto(e));

        return settings;
    }
}

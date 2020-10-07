import { apiChangePass, apiUpdateUser } from "../../api.js";
import { jpost } from "../../modules/jfetch.js";
import {Component} from "../../modules/Softer/Softer.js";
import {changeHandler} from "../../utils/utils.js";
import ErrorField from "../Form/ErrorField.js";
import GridField from "../Form/GridField/GridField.js";
import Submit from "../Form/Submit/Submit.js";
import {setUploadedImage} from "../../utils/utils.js"
import {useDispatch} from "../../modules/Softer/softer-softex.js"
import {setPhoto} from "../../store/actions.js"

export default class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.fields = [
            {title: 'Текущий пароль', type: 'password', name: 'password1'},
            {title: 'Новый пароль', type: 'password', name: 'password2'},
            {title: 'Повторите пароль', type: 'password', name: 'password3'}
        ];

        this.data = {
            avatar: '',
            password1: '',
            password2: '',
            password3: ''
        };

        this.state = {
            errors: {}
        }
    }

    changePass(e) {
        e.preventDefault();
        jpost(apiChangePass(), this.data)
            .then(response => {
                if (response.status === 200) {
                    // TODO: dispatch
                } else {
                    response.json()
                        .then(errors => this.setState({errors}))
                }
            })
    }

    changePhoto(e) {
        e.preventDefault();
        const dispatch = useDispatch();
        const imgHandler = src => dispatch(setPhoto(src));
        setUploadedImage(e, imgHandler);
    }

    render() {
        const data = this.useSelector(state => state.user.userData);
        const {errors} = this.state;

        const [settings, replace, listen] = this.create('div', `
        <div class="profile-settings">
            <div class="email">
                <div class="email-title">E-mail:</div>
                ${data.email}
            </div>
            <div class="flexbox">
                <div class="avatar-container">
                    <img class="avatar" src=${data.avatar ? data.avatar : '/src/images/default-avatar.svg'} />
                    <input class="avatar-input" type="file" accept="image/png", image/jpeg>
                </div>
                <form class="password-form">
                    <GridFields></GridFields>
                    ${errors['non_field_errors'] ? `<FieldError></FieldError>` : ''}
                    <SubmitButton></SubmitButton>
                </form>
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
            SubmitButton: new Submit('Подтвердить').render(),
        })

        if (errors['non_field_errors']) {
            replace({
                FieldError: new ErrorField(errors['non_field_errors']).render()
            })
        }

        listen('.password-form', 'submit', e => this.changePass(e));
        listen('.avatar-input', 'change', e => this.changePhoto(e));

        return settings;
    }
}

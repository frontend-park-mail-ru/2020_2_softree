import {Component} from "../../modules/Softer/Softer.js";
import {changeHandler} from "../../utils/utils.js";
import ErrorField from "../Form/ErrorField.js";
import GridField from "../Form/GridField/GridField.js";
import Submit from "../Form/Submit/Submit.js";

export default class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.fields = [
            {title: 'Email', type: 'email', name: 'email'},
            {title: 'Текущий пароль', type: 'password', name: 'password1'},
            {title: 'Пароль', type: 'password', name: 'password2'},
            {title: 'Повторите пароль', type: 'password', name: 'password3'}
        ];

        this.data = {
            email: '',
            password1: '',
            password2: '',
            password3: ''
        };

        this.state = {
            errors: {}
        }
    }

    render() {
        const {errors} = this.state;

        const [settings, replace, listen] = this.create('div', `
        <div class="hidden-wrapper">
            <form class="photo-form">
                <a>Email</a>
                <div class="avatar"></div>
                <ChoosePhotoBtn></ChoosePhotoBtn>
            </form>
            <form class="grid-form">
                <GridFields></GridFields>
                ${errors['non_field_errors'] ? `<FieldError></FieldError>` : ''}
                <SubmitButton></SubmitButton>
            </form>
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
            ChoosePhotoBtn: new Submit('Выбрать фото').render()
        })

        if (errors['non_field_errors']) {
            replace({
                FieldError: new ErrorField(errors['non_field_errors']).render()
            })
        }

        listen('form', 'submit', e => this.submit(e));

        return [settings];
    }
}

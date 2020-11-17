import { Component } from '../../../modules/Softer/Softer.js';
import { useDispatch } from '../../../modules/Softer/softer-softex.js';
import { setPhoto } from '../../../store/actions.js';
import { setUploadedImage } from '../../../utils/utils.js';

import avatar from '../../../images/avatar.svg';
import './User.scss';
import Submit from "../../UI/Form/Submit/Submit";

export default class User extends Component {
    changePhoto(e, oldAvatar) {
        e.preventDefault();
        const dispatch = useDispatch();
        const imgHandler = src => {
            dispatch(setPhoto(src, oldAvatar));
        };
        setUploadedImage(e, imgHandler);
    }

    render() {
        const data = this.useSelector(state => state.user.userData);

        const userSettings = this.create(`
            <div class='user'>
                <img class='user__avatar' src='${data.avatar || avatar}' alt='avatar'/>
                <Submit/>
                <input id='upload-file' type='file' accept='image/*' hidden='true'/>
                <div class='user__email'>
                    <p>E-mail</p> <p>${data.email}</p>
                </div>
            </div>
                `, {
            Submit: [Submit, 'Выбрать фото']
        });

        this.listen('.submit-button', 'click', () => {
            document.querySelector('#upload-file').click();
        });

        this.listen('#upload-file', 'change', e => this.changePhoto(e, data.avatar));
        return userSettings;
    }
}

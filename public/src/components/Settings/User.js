import { Component } from '../../modules/Softer/Softer.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { setPhoto } from '../../store/actions.js';
import { setUploadedImage } from '../../utils/utils.js';

export default class User extends Component {
    constructor() {
        super();
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

        const userSettings = this.create(`
            <div class='avatar-container'>
                <img class='avatar' src='${data.avatar || '/src/images/avatar.svg'}' alt='avatar'/>
                <div class='avatar-btn submit-button' btn'>
                    <p>Выбрать фото</p>
                    <input class='avatar-input' id='upload-file' type='file' accept='image/*' hidden='true'/>
                </div>
                <div class='email-flexbox'>
                    <p>E-mail</p>
                    <p>${data.email}</p>
                </div>
                `);

        this.listen('.avatar-btn', 'click', () => {
            document.querySelector('#upload-file').click();
        });

        this.listen('.avatar-input', 'change', e => this.changePhoto(e));
        return userSettings;
    }
}

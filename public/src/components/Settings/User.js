import { Component } from '../../modules/Softer/Softer.js';

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
            <div class="avatar-container">
                <div class="email-title">${data.email}</div>
                <img class="avatar" src="${
                    data.avatar || '/src/images/avatar.svg'
                }" alt="avatar"/>
                <input class="avatar-input btn" type="image" value="Выбрать фото" accept="image/*"></input>`);
        this.listen('.avatar-input', 'change', e => this.changePhoto(e));
        return userSettings;
    }
}

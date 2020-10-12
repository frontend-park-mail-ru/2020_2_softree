import { apiLogOut } from '../../api.js';
import { Component, listen } from '../../modules/Softer/Softer.js';
import { pageProfile, pageHistory, pageSettings, pageSignIn } from '../../pages.js';
import { jpost } from '../../modules/jfetch.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { dropUserData } from '../../store/actions.js';

export default class Menu extends Component {
    constructor() {
        super();
    }

    logOut(e) {
        e.preventDefault();
        jpost(apiLogOut())
            .catch(({ status }) => {
                if (status === 302) {
                    useDispatch()(dropUserData());
                    this.redirect(...pageSignIn());
                }
            });
    }

    render() {
        const menu = this.create( `
        <div>
            <div class="flex-menu">
                <div class="flex-left">
                    <div class="b1-link btn">Портфель</div>
                    <div class="b2-link btn">История</div>
                </div>
                <div class="flex-right">
                    <div class="b3-link btn">Настройки</div>
                    <div class="b4-link btn">Выход</div>
                </div>
            </div>
        </div>
                `);

        this.link('.b1-link', ...pageProfile());
        this.link('.b2-link', ...pageHistory());
        this.link('.b3-link', ...pageSettings());

        this.listen('.b4-link', 'click', e => this.logOut(e));

        return menu;
    }
}

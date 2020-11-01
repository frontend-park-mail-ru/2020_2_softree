import { apiLogOut } from '../../api.js';
import { Component } from '../../modules/Softer/Softer.js';
import { pageSignIn } from '../../pages.js';
import { jpost } from '../../modules/jfetch.js';
import { useDispatch } from '../../modules/Softer/softer-softex.js';
import { dropUserData } from '../../store/actions.js';

export default class Exit extends Component {
    constructor() {
        super();
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

    render() {
        const exit = this.create(`
        <div>
            <div class="flex-menu">
                <div class="flex-right">
                    <div class="exit-btn btn">Выход</div>
                </div>
            </div>
        </div>
        `);

        this.listen('.exit-btn', 'click', e => this.logOut(e));
        return exit;
    }
}

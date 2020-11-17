import { Component } from '../../modules/Softer/Softer.js';
import './Page404.scss';

export default class Page404 extends Component {
    render() {
        const page = this.create(`
        <div class='hidden-wrapper'>
            <p class='code-404'>404</p>
            <div class='modal page-message'>
                <article>
                    <h1>Страница не нашлась :(</h1> 
                    <p class='page-message__body'>По адресу ${window.location.pathname} ничего нет(</p>
                    <a class='mainPage-link' href='/'>На главную страницу</a>
                </article> 
            </div> 
        </div>
        `);
        this.link('.mainPage-link', 'Главная страница', '/');
        return page;
    }
}

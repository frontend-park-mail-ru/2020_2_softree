import { Component } from '../../modules/Softer/Softer.js';
import './Page404.css';

export default class Page404 extends Component {
    constructor() {
        super();
    }

    render() {
        const page = this.create(`
        <div class='hidden-wrapper'>
            <p class='code-404'>404</p>
            <div class='modal fix'>
                <article class='message'>
                    <h1>Страница не нашлась :(</h1> 
                    <p class='message-body'>По адресу ${window.location.pathname} ничего нет(</p>
                    <a class='mainPage-link' href='/'>На главную страницу</a>
                </article> 
            </div> 
        </div>
        `);
        this.link('.mainPage-link', 'Главная страница', '/');
        return page;
    }
}

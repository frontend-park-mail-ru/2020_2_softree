'use strict'

class Router {
    constructor(path, component) {
        this.path = path;
        this.component = component;
    }

    render() {
        return this.component();
    }
}

class Switch {
    constructor(...routers) {
        this.routers = routers;
    }

    render() {
        for (let i = 0; i < this.routers.length; i++) {
            if (this.routers[i].path === window.location.pathname) {
                return this.routers[i].render();
            }
        }
    }
}

const treeRender = (element, tree) => {
    tree.forEach(node => {
        if (node instanceof Node) {
            element.appendChild(node);
        }
        if (node instanceof Switch) {
            element.appendChild(node.render());
        }
        if (node instanceof Array) {
            treeRender(element, node);
        }
    })
}

const render = (element, tree) => {
    element.innerHTML = ''
    treeRender(element, tree)
}

const Redirect = (state, title, href) => {
    window.history.pushState({id: target.id}, target.title, target.href);
    window.render();
}

const Link = (title, href) => {
    if (window.location.pathname === href) {
        return
    }
    return e => {
        if (e) {
            e.preventDefault();
        }
        window.history.pushState({path: window.location.pathname, title: document.title}, title, href);
        document.title = title;
        window.render();
    }
}

//Utils
// ==================================================================================================================
//Components

const Header = () => {
    const header = document.createElement('header')
    header.className = 'header';
    header.innerHTML = `
    <div class="header__logo">
        <img class="header__logo_img" src="static/images/cat.svg" alt="Logo"/>
        <p class="header__logo_text">MoneyCat</p>
    </div>
    <div class="header__control">
        <img class="header__control_avatar" src="static/images/avatar.svg" alt="Aavatar"/>
    </div>`;

    header.querySelector('.header__logo')
        .addEventListener('click', Link('Главная страница', "/"));

    header.querySelector('.header__control_avatar')
        .addEventListener('click', Link('Профиль', '/signup'));

    return header;
}

const GridField = ({title, type, name, value}) => {
    const field = document.createElement('div');
    field.className = "grid-field";
    field.innerHTML = `
    <label>${title}</label>
    <input type="${type}" name="${name}" value="${value ? value : ''}"/>
    `;
    return field;
}

const SignUp = () => {
    const signUp = document.createElement('div')
    const fields = [
        {title: 'Email', type: 'email', name: 'name'},
        {title: 'Пароль', type: 'password', name: 'password'},
        {title: 'Повторите пароль', type: 'password', name: 'password2'}
    ];
    signUp.innerHTML = `
    <div class="hidden-wrapper">
        <div class="modal">
            <h1>Добро пожаловать!</h1>
            <form class="grid-form">
            </form> 
        </div> 
    </div> 
    `;

    signUp.querySelector('.grid-form').append(...fields.map(field => GridField(field)))
    return signUp;
}

const SignIn = () => {
    const hello = document.createElement('div')
    hello.innerHTML = "This is signup";
    return hello;
}

const MainPage = () => {
    const hello = document.createElement('div')
    hello.innerHTML = "HELLO, THis is main page";
    return hello;
}

const App = () => {
    const div = document.createElement("div")
    div.innerHTML = "HELLOSIKI"

    const div2 = document.createElement("div")
    div2.innerHTML = "FUCK"

    return [Header(),
        new Switch(
            new Router('/', MainPage),
            new Router('/signin', SignIn),
            new Router('/signup', SignUp)
        )
    ]
}

//Components
// ==================================================================================================================
//Init

const app = document.getElementById('root');

window.onpopstate = e => {
    e.preventDefault();
    window.render();
}

window.render = () => render(app, App())
window.render()

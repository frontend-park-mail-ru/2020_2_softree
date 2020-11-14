/**
 * @module Softer
 * Модуль, в котором находятся необходимые элементы для отоброжения контента
 */

import { id, createElement, overallPath } from './utils.js';
import { select, useSelector } from './softer-softex.js';
import { pageSignUp } from '../../pages.js';

/** Класс компоненты. От него нужно наследоваться при создании компоненты. */
export class Component {
    /**Создание компоненты
     * @param {Object} props - свойства объекта, которые влияют на отображение компоненты
     * @param {Object} initState - свойства объекта, которые отвечают за визуальное состояние компоненты.
     * Изменение этих свойств произовдится через метод setState и ведет за собой ререндер страницы
     * @param {Object} initData - свойства объекта, которые отвечают за состояние компоненты с точки зрения данных.
     * Изменение производится через setDataState, ререндер не последует. Удобно при заполнении форм*/
    constructor(props = {}) {
        this.props = props;
        this.children = [];
        this.id = id();
        this.state = this.initState();
        this.data = this.initData();
        this.node = null;
        this.isRoot = false;
        this.doNotReset = false;
        this.key = props.key || 0;
    }

    initState() {
        return {};
    }

    initData() {
        return {};
    }

    /**
     * Создает и возвращает HTML элемент компоненты.
     * @return {HTMLElement}
     */
    render() {}

    clear() {
        this.node = null;
    }

    /**
     * Создает HTMLElement, а так же Replacer и Listener для него
     * Replacer - среди элемента можем найти интересующий элемент и заменить его на тот, что необходим нам
     * Listener - среди элемента можем найти интересующий элемент и повесить на него событие
     * @param {string} tag - тег элемента
     * @param content - содержимое элемента * @param {Object} options - параметры тэга
     * @return {HTMLElement}
     */
    create(content = '', components = {}) {
        const element = createElement(content);
        this.__replaceComponents(element, components);
        this.listen = (selector, event, clb) => listen(element, selector, event, clb);
        return element;
    }

    listen(selector, event, clb) {}

    afterRerender() {}

    /**
     * Обновляет состояние this.state новыми пармаетрами из state. Указывается объект с полями, которые хотим изменить
     * или добавить. Другие поля останутся нетронутыми. Вызов этой функции влечет за собой ререндер компоненты.
     * @param {Object} state
     */
    setState(state) {
        if (state instanceof Function) {
            this.state = state(this.state);
        } else {
            this.state = { ...this.state, ...state };
        }
        this.__rerender();
    }

    useSelector(selector) {
        return useSelector(this, selector);
    }

    /**
     *
     * @param {} component
     * @param {Object} props
     * @return {*}
     */
    __place(component, props = { key: 0 }) {
        const idx = this.__includes(component, props.key);
        if (idx === -1) {
            const newComponent = new component(props);
            newComponent.parent = this;
            this.children.push(newComponent);
            return newComponent;
        }

        this.children[idx].props = props;
        return this.children[idx];
    }

    __resetState() {
        if (!this.doNotReset) {
            this.state = this.initState();
            this.data = this.initData();
        }
    }

    __includes(component, key = 0) {
        for (let idx = 0; idx < this.children.length; idx++) {
            if (this.children[idx].constructor.name === component.name && this.children[idx].key === key) {
                return idx;
            }
        }

        return -1;
    }

    __rerender() {
        this.__clearChildren(this);
        const node = this.render();
        this.node.replaceWith(node);
        this.node = node;
        try {
            this.afterRerender();
        } catch (e) {}
    }

    /**
     * Так же, как и setState, только обновляет состояние в this.data. Не влечет за собой ререндер страницы.
     * @param {Object} state
     */
    setData(state) {
        this.data = { ...this.data, ...state };
    }

    link(selector, title, href) {
        this.listen(selector, 'click', e => {
            e.preventDefault();
            this.__historyPushState(title, href);
        });
    }

    redirect(title, href) {
        this.__historyPushState(title, href);
    }

    __replaceComponents(element, components) {
        for (let component in components) {
            const config = components[component];
            let input;
            if (config.__proto__.name === 'Component') {
                input = [[config]];
            } else if (config[1] instanceof Array) {
                input = config[1].map(props => [config[0], props]);
            } else {
                input = [config];
            }
            this.__replaceComponent(element, component, ...input);
        }
    }

    __findRoot() {
        let root = this;
        while (!root.isRoot) {
            console.assert(root.parent !== undefined, 'У компоненты', root, 'нет родителя');
            root = root.parent;
        }
        return root;
    }

    __findSwitch(path) {
        let node = this;
        while (!(node.isRoot || (node instanceof Switch && node.path === path))) {
            console.assert(node.parent !== undefined, 'У компоненты', node, 'нет родителя');
            node = node.parent;
        }
        if (node.isRoot) {
            for (let idx = 0; idx < node.children.length; idx++) {
                if (node.children[idx] instanceof Switch) {
                    return node.children[idx];
                }
            }
        }
        return node;
    }

    __replaceComponent(element, selector, ...nodes) {
        const query = element.querySelectorAll(selector);
        if (!query) {
            return;
        }
        query.forEach(foundElement =>
            foundElement.replaceWith(
                ...nodes.map(node => {
                    const component = this.__place(node[0], node[1]);
                    component.node = component.render();
                    return component.node;
                }),
            ),
        );
    }

    __rerenderSwitch(path) {
        const node = this.__findSwitch(path);
        node.__rerender();
    }

    __historyPushState(title, href) {
        const currentPath = window.location.pathname;
        if (currentPath === href) {
            return;
        }
        window.history.pushState({ path: currentPath, title: document.title }, title, href);
        document.title = title;
        this.__rerenderSwitch(overallPath(currentPath, href));
    }

    __clearChildren(root) {
        const clear = element => {
            if (element.children) {
                element.children.forEach(child => clear(child));
            }
            if (element !== root) {
                if (element.clear) {
                    element.__resetState();
                    element.clear();
                }
            }
        };
        clear(root);
    }
}

export class Softer {
    constructor() {
        this.store = null;

        this.init();
    }

    connectStore(store) {
        this.store = store;
    }

    init() {
        window.Softer = this;

        window.addEventListener('popstate', e => {
            e.preventDefault();
        });
    }

    initApp(element, app) {
        const newApp = new app();
        newApp.parent = this;
        newApp.isRoot = true;
        newApp.clearList = [];

        Render(element, newApp);
    }
}

const listen = (node, selector, event, clb) => {
    if (node.matches(selector)) {
        node.addEventListener(event, e => clb(e));
    }

    const query = node.querySelectorAll(selector);
    if (!query) {
        return;
    }
    query.forEach(element => element.addEventListener(event, e => clb(e)));
};

/**
 * Рендерит дерево элементов в указаном элементе
 * @param {HTMLElement} element - элемент, в котором будет генерироваться приложение
 * @param {Component} app - компонента
 */
export const Render = (element, app) => {
    element.innerHTML = '';
    const node = app.render();
    app.node = node;
    element.appendChild(app.node);
};

/**
 * Маршрутизатор, который выбирает на основании пути (window.location.pathname) подходящий роутер.
 */
export class Switch extends Component {
    constructor(props) {
        super(props);
    }

    checkPathFor(router) {
        const currentPathName = window.location.pathname;
        if (router.exact) {
            return this.props.path || '' + router.path === currentPathName;
        }
        const match = currentPathName.match(router.path);
        return !!match;
    }

    /**
     * Выбирает и рендерит роутер в соответствии с window.location.pathname === router.path. Если не нашлось подходящего,
     * выбирает последний. В качестве последнего удобно поставить страницу 404
     * @return {[]}
     */
    renderRouter() {
        for (let i = 0; i < this.props.routers.length; i++) {
            if (this.checkPathFor(this.props.routers[i])) {
                return [Router, this.props.routers[i]];
            }
        }
        return [Router, this.props.routers[this.props.routers.length - 1]];
    }

    render() {
        return this.create('<div><Router/></div>', {
            Router: this.renderRouter(),
        });
    }
}

/**
 * Роутер, который сопровождает элемент и его опции.
 * Указывается в Switch и вне не имеет сымсла
 */
export class Router extends Component {
    /**
     * Создает роутер
     * @param {string} path - путь, согласно которому будет отображаться компонента
     * @param {Component} component - компонента, которая будет генерироваться
     * @param {Object} props - Опции компоненты
     */
    constructor(props) {
        super(props);
    }

    clear() {
        if (this.props.component.clear) {
            this.props.component.clear.bind(this.component)();
        }
    }

    authCheck() {
        return select(state => state.user.userData.email);
    }

    /**
     * Возвращает результат рендеринга роутера
     * @return {HTMLElement}
     */
    render() {
        if (this.props.authRequired && !this.authCheck()) {
            const loading = this.useSelector(store => store.user.loading);
            if (loading) {
                return this.create('<h2>Загрузка...</h2>');
            } else {
                this.redirect(...pageSignUp());
            }
        }
        return this.create(
            `
        <div>
            <Component/> 
        </div>
        `,
            {
                Component: [this.props.component, this.props.componentProps],
            },
        );
    }
}

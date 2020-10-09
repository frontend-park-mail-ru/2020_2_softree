/**
 * @module Softer
 * Модуль, в котором находятся необходимые элементы для отоброжения контента
 */

import {id} from '../../utils/utils.js';
import {select, useSelector} from './softer-softex.js';
import {pageSignUp} from '../../pages.js';

/** Класс компоненты. От него нужно наследоваться при создании компоненты. */
export class Component {
    /**Создание компоненты
     * @param {Object} props - свойства объекта, которые влияют на отображение компоненты
     * @param {Object} initState - свойства объекта, которые отвечают за визуальное состояние компоненты.
     * Изменение этих свойств произовдится через метод setState и ведет за собой ререндер страницы
     * @param {Object} initData - свойства объекта, которые отвечают за состояние компоненты с точки зрения данных.
     * Изменение производится через setDataState, ререндер не последует. Удобно при заполнении форм*/
    constructor({props = {}, appId = null} = {}) {
        this.props = props;
        this.state = {};
        this.data = {};
        this.node = null;
    }

    /**
     *
     * @param {} component
     * @param {Object} props
     * @param {any} key
     * @return {*}
     */
    place(component, props = {}) {
        const newComponent = new component(props);
        newComponent.parent = this;
        if (newComponent.clear) {
            this.__placeClearClbToClearList(newComponent.clear.bind(newComponent));
        }
        return newComponent
    }

    useSelector(selector) {
        return useSelector(this, selector);
    }

    rerender() {
        console.assert(this.node !== null, 'У компоненты', this, 'нет HTMLElement');
        this.node.replaceWith(this.render());
    }


    /**
     * Обновляет состояние this.state новыми пармаетрами из state. Указывается объект с полями, которые хотим изменить
     * или добавить. Другие поля останутся нетронутыми. Вызов этой функции влечет за собой ререндер компоненты.
     * @param {Object} state
     */
    setState(state) {
        this.state = {...this.state, ...state};
        this.rerender();
    }

    /**
     * Так же, как и setState, только обновляет состояние в this.data. Не влечет за собой ререндер страницы.
     * @param {Object} state
     */
    setData(state) {
        this.data = {...this.data, ...state};
    }

    /**
     * Создает HTMLElement, а так же Replacer и Listener для него
     * Replacer - среди элемента можем найти интересующий элемент и заменить его на тот, что необходим нам
     * Listener - среди элемента можем найти интересующий элемени и повесить на него событие
     * @param {string} tag - тег элемента
     * @param content - содержимое элемента * @param {Object} options - параметры тэга
     * @return {[*, function(*=, ...[*]): void, function(*=, *=, *=): void]}
     */
    create(tag, content = '', options = {}) {
        if (!this.node) {
            this.node = document.createElement(tag);
            for (let option in options) {
                this.node[option] = options[option];
            }
        }
        return setupNode(this.node, content);
    }

    link(selector, title, href) {
        listen(this.node, selector, 'click', e => {
            e.preventDefault();
            this.__historyPushState(title, href);
        })
    }

    redirect(title, href) {
        this.__historyPushState(title, href);
    }

    /**
     * Создает и возвращает HTML элемент компоненты.
     * @return {HTMLElement}
     */
    render() {
    }

    __placeClearClbToClearList(clb) {
        const root = this.__findRoot();
        root.clearList.push(clb);
    }

    __findRoot() {
        let root = this;
        while (!root.isRoot) {
            console.assert(root.parent !== undefined, "У компоненты", root, "нет родителя");
            root = root.parent;
        }
        return root;
    }

    __rerenderAll() {
        const root = this.__findRoot();

        root.clearList.forEach(clb => clb());
        root.clearList = []
        root.render();
    }

    __historyPushState(title, href) {
        window.history.pushState({path: window.location.pathname, title: document.title}, title, href);
        document.title = title;
        this.__rerenderAll();
    }
}

export class Softer {
    constructor() {
        this.store = null;

        this.init()
    }

    connectStore(store) {
        this.store = store;
    }

    init() {
        window.Softer = this;

        window.addEventListener('popstate', e => {
            e.preventDefault();
        })
    }

    initApp(element, app) {
        const newApp = new app();
        newApp.parent = this;
        newApp.isRoot = true;
        newApp.clearList = [];

        Render(element, newApp.render());
    }
}

/**
 * Рендерит дерево элементов в указаном элементе
 * @param {HTMLElement} element - элемент, в котором будет генерироваться приложение
 * @param {HTMLElement[], Switch} tree - дерево элементов, которое представляет из себя приложение
 */
export const Render = (element, app) => {
    element.innerHTML = ''
    element.appendChild(app);
}

/**
 * Маршрутизатор, который выбирает на основании пути (window.location.pathname) подходящий роутер.
 */
export class Switch {
    constructor(...routers) {
        this.routers = routers;
    }

    checkPathFor(router) {
        const currentPathName = window.location.pathname;
        if (router.exact) {
            return router.path === currentPathName;
        }
        const match = currentPathName.match(router.path);
        return !!match;
    }

    /**
     * Выбирает и рендерит роутер в соответствии с window.location.pathname === router.path. Если не нашлось подходящего,
     * выбирает последний. В качестве последнего удобно поставить страницу 404
     * @return {HTMLElement}
     */
    render() {
        for (let i = 0; i < this.routers.length; i++) {
            if (this.checkPathFor(this.routers[i])) {
                return this.routers[i].render();
            }
        }
        return this.routers[this.routers.length - 1].render();
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
    constructor({path, component, exact, componentProps, authRequired}) {
        super();
        this.component = {component, componentProps};
        this.path = path;
        this.exact = exact;
        this.authRequired = authRequired;
    }

    init() {
        const {component, componentProps} = this.component;
        this.component = this.place(component, componentProps);
    }

    authCheck() {
        return select(state => state.user.userData);
    }

    /**
     * Возвращает результат рендеринга роутера
     * @return {HTMLElement}
     */
    render() {
        if (this.authRequired && !this.authCheck()) {
                this.redirect(...pageSignUp());
                return document.createElement('div');
        }

        this.init()

        return this.component.render();
    }
}

/**
 * Заменяет тег в HTML элементе на указанный (ые) элементы
 * @param {HTMLElement} element
 * @param {string} selector
 * @param {Node} nodes
 */
export const replace = (element, selector, ...nodes) => {
    [...element.querySelectorAll(selector)].forEach(element => element.replaceWith(...nodes));
}

export const listen = (element, selector, event, clb) => {
    [...element.querySelectorAll(selector)].forEach(element => element.addEventListener(event, e => clb(e)));
}

/**
 *
 * @param {HTMLElement, Node, Component} node
 */
export const renderNode = (node) => {
    if (node instanceof HTMLElement) {
        return node;
    } else {
        return node.render();
    }
}

export const ReplacerTo = (element) => {
    return (context, ...nodes) => {
        if (nodes.length !== 0) {
            if (!(context instanceof String)) {
                throw new TypeError('Неверное использование. Первым аргументом должен быть селектором');
            }
            replace(element, context, ...nodes.map(node => renderNode(node)));
        }

        let selector;
        for (selector in context) {
            if (context[selector] instanceof Array) {
                replace(element, selector, ...context[selector].map(node => renderNode(node)));
            } else {
                replace(element, selector, renderNode(context[selector]));
            }
        }
    }
}

export const ListenerFor = (element) => {
    return (selector, event, clb) => listen(element, selector, event, clb);
}

export const setupNode = (node, content) => {
    node.innerHTML = content;
    return [node, ReplacerTo(node), ListenerFor(node)];
}

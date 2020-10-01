/**
 * @module Softer
 * Модуль, в котором находятся необходимые элементы для отоброжения контента
 */

import {id} from "../../utils/utils.js";

/** Класс компоненты. От него нужно наследоваться при создании компоненты. */
export class Component {
    /**Создание компоненты
     * @param {Object} props - свойства объекта, которые влияют на отображение компоненты
     * @param {Object} initState - свойства объекта, которые отвечают за визуальное состояние компоненты.
     * Изменение этих свойств произовдится через метод setState и ведет за собой ререндер страницы
     * @param {Object} initData - свойства объекта, которые отвечают за состояние компоненты с точки зрения данных.
     * Изменение производится через setDataState, ререндер не последует. Удобно при заполнении форм*/
    constructor({props = {}, initState= {}, initData = {}, appId = null} = {}) {
        this.props = props;
        this.state = initState;
        this.data = initData;
        this.node = null;

        this.appId = appId;
    }

    appId = null;
    key = null;

    /**
     *
     * @param {} component
     * @param {Object} props
     * @param {any} key
     * @return {*}
     */
    place(component, props= {}) {
        const newComponent = new component({...props, appId: this.appId});
        newComponent.key = id();
        return newComponent
    }

    #rerender() {
        if (!this.node) {
            window.render();
        }
        const renderResult = this.render();
        if (renderResult instanceof Array) {
            this.node.replaceWith(...renderResult);
        } else {
            this.node.replaceWith(renderResult);
        }
    }

    /**
     * Включает CSS стили. Если не указывать параметры, то создает в <head>
     * тег <link rel="stylesheet" href="src/components/<COMPONENT_NAME>"/>
     * @param {string} name - Имя CSS файла, если оно не совпадает с именем компоненты (без .css)
     * @param {string} path - Путь к папке файла CSS, если он находится глубже src/components/. Указывается
     * путь до папки с файлом .css. То есть если путь до файла есть src/components/Form/GridField/GridField.css,
     * то указываем только Form/GridField
     */
    includeCSS({name = '', path = ''} = {}) {
        if (!name) {
            name = this.constructor.name;
        }
        const included = document.head.querySelector(`#${name}`);
        if (!included) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            if (path) {
                link.href = `src/components/${path}/${name}.css`;
            } else {
                link.href = `src/components/${name}/${name}.css`;
            }
            link.id = name;
            document.head.appendChild(link);
        }
    }

    /**
     * Обновляет состояние this.state новыми пармаетрами из state. Указывается объект с полями, которые хотим изменить
     * или добавить. Другие поля останутся нетронутыми. Вызов этой функции влечет за собой ререндер компоненты.
     * @param {Object} state
     */
    setState(state) {
        this.state = {...this.state, ...state};
        this.#rerender();
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
     * @param content - содержимое элемента
     * @param {Object} options - параметры тэга
     * @return {[*, function(*=, ...[*]): void, function(*=, *=, *=): void]}
     */
    create (tag, content = '', options = {}) {
        if (!this.node) {
            this.node = document.createElement(tag);
            let option;
            for (option in options) {
                this.node[option] = options[option];
            }
        }
        return setupNode(this.node, content);
    }

    link(selector, title, href) {
        listen(this.node, selector, 'click', e => {
            e.preventDefault();
            window.history.pushState({path: window.location.pathname, title: document.title}, title, href);
            document.title = title;
            window.Softer.rerenderApp(this.appId);
        })
    }

    /**
     * Создает и возвращает HTML элемент компоненты.
     * @return {HTMLElement, HTMLInputElement | [HTMLElement, Switch, HTMLInputElement]}
     */
    render() {
    }
}

export class Softer {
    constructor() {
        this.apps = {};

        window.Softer = this;
    }

    initApp(element, app, props = {}) {
        const appId = id();
        const newApp = new app({props, appId});
        const render = () => Render(element, newApp.render());
        this.apps[appId] = {render, components: {}};
        window.addEventListener('popstate', e => {
            e.preventDefault();
            render();
        })
        render();
    }

    rerenderApp(appId) {
        this.apps[appId].render();
    }
}

/**
 * Рендерит дерево элементов в указаном элементе
 * @param {HTMLElement} element - элемент, в котором будет генерироваться приложение
 * @param {HTMLElement[], Switch} tree - дерево элементов, которое представляет из себя приложение
 */
export const Render = (element, tree) => {
    element.innerHTML = ''
    treeRender(element, tree)
}

/**
 * Маршрутизатор, который выбирает на основании пути (window.location.pathname) подходящий роутер.
 */
export class Switch {
    constructor(...routers) {
        this.routers = routers;
    }

    /**
     * Выбирает и рендерит роутер в соответствии с window.location.pathname === router.path. Если не нашлось подходящего,
     * выбирает последний. В качестве последнего удобно поставить страницу 404
     * @return {HTMLElement}
     */
    render() {
        for (let i = 0; i < this.routers.length; i++) {
            if (this.routers[i].path === window.location.pathname) {
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
    constructor({path, component, componentProps, appId}) {
        super({appId});
        this.path = path;
        this.component = this.place(component, componentProps);
    }

    /**
     * Возвращает результат рендеринга роутера
     * @return {HTMLElement}
     */
    render() {
        return this.component.render();
    }
}

export const Redirect = (state, title, href) => {
    window.history.pushState({id: target.id}, target.title, target.href);
    window.render();
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

export const ReplacerTo = (element) => {
    return (context, ...nodes) => {
        if (nodes.length !== 0) {
           if (!(context instanceof String)) {
               throw new TypeError('Неверное использование. Первым аргументом должен быть селектором');
           }
           replace(element, context, ...nodes);
        }

        let selector;
        for (selector in context) {
            if (context[selector] instanceof Array) {
                replace(element, selector, ...context[selector]);
            } else {
                replace(element, selector, context[selector]);
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

const treeRender = (element, tree) => {
    tree.forEach(node => {
        if (node instanceof HTMLElement) {
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

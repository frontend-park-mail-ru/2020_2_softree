/**
 * @module Softer
 * Модуль, в котором находятся необходимые элементы для отоброжения контента
 */

/** Класс компоненты. От него нужно наследоваться при создании компоненты. */
export class Component {
    /**Создание компоненты
     * @param {Object} props - свойства объекта, которые влияют на отображение компоненты
     * @param {Object} initState - свойства объекта, которые отвечают за визуальное состояние компоненты.
     * Изменение этих свойств произовдится через метод setState и ведет за собой ререндер страницы
     * @param {Object} initDataState - свойства объекта, которые отвечают за состояние компоненты с точки зрения данных.
     * Изменение производится через setDataState, ререндер не последует. Удобно при заполнении форм*/
    constructor(props= {}, initState = {}, initDataState = {}) {
        this.props = props;
        this.state = initState;
        this.dataState = initDataState;
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
     * или добавить. Другие поля останутся нетронутыми. Вызов этой функции влечет за собой ререндер страницы.
     * @param {Object} state
     */
    setState(state) {
        this.state = {...this.state, ...state};
        window.render();
    }

    /**
     * Так же, как и setState, только обновляет состояние в this.dataState. Не влечет за собой ререндер страницы.
     * @param {Object} state
     */
    setDataState(state) {
        this.dataState = {...this.dataState, ...state};
    }

    /**
     * Создает и возвращает HTML элемент компоненты.
     * @return {HTMLElement, HTMLInputElement | [HTMLElement, Switch, HTMLInputElement]}
     */
    render() {
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
     * Выбирает и рендерит роутер в соответствии с window.location.pathname === router.path
     * @return {HTMLElement}
     */
    render() {
        for (let i = 0; i < this.routers.length; i++) {
            if (this.routers[i].path === window.location.pathname) {
                return this.routers[i].render();
            }
        }
    }
}

/**
 * Роутер, который сопровождает элемент и его опции.
 * Указывается в Switch и вне не имеет сымсла
 */
export class Router {
    /**
     * Создает роутер
     * @param {string} path - путь, согласно которому будет отображаться компонента
     * @param {Component} component - компонента, которая будет генерироваться
     * @param {Object} props - Опции компоненты
     */
    constructor(path, component, props= {}) {
        this.path = path;
        this.component = new component(props);
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

export const Link = (title, href) => {
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
    return (selector, ...nodes) => replace(element, selector, ...nodes)
}

export const ListenerFor = (element) => {
    return (selector, event, clb) => listen(element, selector, event, clb);
}

export const softCreate = (tag, content = '') => {
    const element = document.createElement(tag);
    element.innerHTML = content;
    return [element, ReplacerTo(element), ListenerFor(element)];
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

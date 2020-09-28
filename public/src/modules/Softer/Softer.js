export class Component {
    constructor(props) {
        this.props = props;
    }

    includeCSS(name, pathInComponents) {
        if (!name) {
            name = this.constructor.name;
        }
        const included = document.head.querySelector(`#${name}`);
        if (!included) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            if (pathInComponents) {
                link.href = `src/components/${pathInComponents}`;
            } else {
                link.href = `src/components/${name}/${name}.css`;
            }
            link.id = name;
            document.head.appendChild(link);
        }
    }

    setState(state) {
        this.state = {...this.state, ...state};
        window.render();
    }

    render() {
    }
}

export const Render = (element, tree) => {
    element.innerHTML = ''
    treeRender(element, tree)
}

export class Router {
    constructor(path, component, props) {
        this.path = path;
        this.component = new component(props);
    }

    render() {
        return this.component.render();
    }
}

export class Switch {
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

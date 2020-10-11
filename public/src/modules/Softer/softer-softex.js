import diff from './diff.js';

export function select(selector) {
    return selector(window.Softer.store.getState());
}

export function useSelector(component, selector, id = null) {
    const { store } = window.Softer;
    if (store === null) {
        throw new Error('Store не подключен');
    }

    if (!window.Softer.subscribers) {
        window.Softer.subscribers = [];
    }

    const { subscribers } = window.Softer;

    const result = selector(store.getState());
    id = id || `${component.constructor.name}:${selector.toString().split('=>')[1].split('.').slice(1,).join('.')}`;
    if (subscribers.includes(id)) {
        return result;
    } else {
        subscribers.push(id);
    }

    store.subscribe((was, become) => {
        if (!component) {
            return true;
        }

        try {
            console.log('\texec sub:', component.constructor.name, selector.toString(),
                '\n\t\t', diff(was, become), selector(diff(was, become)));
            if (selector(diff(was, become)) !== undefined) {
                if (component.constructor.name === "Header") {
                   console.log("header")
                }
                console.log("RERENDER BY SUB");
                component.rerender();
            }
        } catch (e) {}
    });
    return result;
}

export const useDispatch = () => {
    const { store } = window.Softer;
    if (store === null) {
        throw new Error('Store не подключен');
    }
    return store.dispatch;
};

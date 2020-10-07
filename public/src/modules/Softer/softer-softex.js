import diff from './diff.js';

export function select(selector) {
    return selector(window.Softer.store.getState());
}

export function useSelector(component, selector) {
    const { store } = window.Softer;
    if (store === null) {
        throw new Error('Store не подключен');
    }

    if (!window.Softer.subscribers) {
        window.Softer.subscribers = [];
    }

    const { subscribers } = window.Softer;
    const result = selector(store.getState());
    if (subscribers.includes(component.key)) {
        return result;
    } else {
        subscribers.push(component.key);
    }

    store.subscribe((was, become) => {
        if (!component.node) {
            return result;
        }

        try {
            selector(diff(was, become));
            component.rerender();
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

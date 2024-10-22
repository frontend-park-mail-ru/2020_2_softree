import diff from './diff.js';

export function select(selector) {
    return selector(window.Softer.store.getState());
}

export function useSelector(component, selector, id = null) {
    const { store } = window.Softer;
    if (store === null) {
        throw new Error('Store не подключен');
    }

    const result = selector(store.getState());

    store.subscribe((was, become) => {
        if (!component || !component.node) {
            return true;
        }

        try {
            if (selector(diff(was, become)) !== undefined) {
                component.__rerender();
            }
        } catch (e) {}
    }, id || component.id + selector.toString().split('return ')[1].split(';')[0]);
    return result;
}

export const useDispatch = () => {
    const { store } = window.Softer;
    if (store === null) {
        throw new Error('Store не подключен');
    }
    return store.dispatch;
};

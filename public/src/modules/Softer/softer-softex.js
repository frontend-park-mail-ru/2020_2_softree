import diff from "./diff.js";

export function select(selector) {
    return selector(window.Softer.store.getState());
}

export function useSelector(component, selector) {
    if (window.Softer.store === null) {
        throw new Error('Store не подключен')
    }

    if (!window.Softer.subscribers) {
        window.Softer.subscribers = [];
    }

    if (window.Softer.subscribers.includes(component.key)) {
        return;
    } else {
        window.Softer.subscribers.push(component.key);
    }

    window.Softer.store.subscribe((was, become) => {
        if (!component.node) {
            return;
        }

        try {
            selector(diff(was, become));
            component.rerender()
        } catch (e) {}

    });
    return selector(window.Softer.store.getState());
}

export const useDispatch = () => {
    if (window.Softer.store === null) {
        throw new Error('Store не подключен')
    }
    return window.Softer.store.dispatch;
}

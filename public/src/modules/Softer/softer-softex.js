export function useSelector(component, selector) {
    if (window.Softer.store === null) {
        throw new Error('Store не подключен')
    }
    window.Softer.store.subscribe(() => component.rerender());
    return selector(window.Softer.store.getState());
}

export const useDispatch = () => {
    if (window.Softer.store === null) {
        throw new Error('Store не подключен')
    }
    return window.Softer.store.dispatch;
}

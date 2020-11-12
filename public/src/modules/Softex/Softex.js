export const createStore = (rootReducer, initialStore = {}) => {
    let state = rootReducer(initialStore, { type: '__INIT__' });
    let subscribers = [];

    return {
        dispatch(action) {
            const was = state;
            state = rootReducer(state, action);
            subscribers = subscribers.filter(sub => !sub(was, state));
        },
        subscribe(clb, id) {
            if (id && subscribers.includes(id)) {
                return;
            }
            subscribers.push(clb);
        },
        getState() {
            return state;
        },
    };
};

export const combineReducer = reducers => {
    return (state = {}, action) => {
        const newState = {};
        for (const reducer in reducers) {
            const previousState = state[reducer];
            newState[reducer] = reducers[reducer](previousState, action);
        }
        return newState;
    };
};

export const applyMiddlewares = (store, ...middlewares) => {
    middlewares = middlewares.reverse();
    let dispatch = store.dispatch;
    middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)));
    return Object.assign({}, store, { dispatch });
};

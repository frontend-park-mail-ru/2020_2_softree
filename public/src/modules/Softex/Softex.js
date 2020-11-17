export const createStore = (rootReducer, initialStore = {}) => {
    let state = rootReducer(initialStore, { type: '__INIT__' });
    let subscribers = [];
    const subIDs = [];

    return {
        dispatch(action) {
            const was = state;
            state = rootReducer(state, action);
            subscribers.forEach(sub => sub(was, state));
        },
        subscribe(clb, id) {
            if (id && subIDs.includes(id)) {
                return;
            }
            subscribers.push(clb);
            if (id) {
                subIDs.push(id);
            }
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

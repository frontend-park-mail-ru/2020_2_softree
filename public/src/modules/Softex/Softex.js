export const createStore = (rootReducer, initialStore = {}) => {
    let state = rootReducer(initialStore, {type: '__INIT__'});
    const subscribers = [];

    return {
        dispatch(action) {
            state = rootReducer(state, action);
            subscribers.forEach(sub => sub());
        },
        subscribe(clb) {
            subscribers.push(clb);
        },
        getState() {
            return state;
        }
    };
}

export const combineReducer = (reducers) => {
    return (state ={}, action) => {
        const newState = {};
        for (let reducer in reducers) {
            const previousState = state[reducer];
            newState[reducer] = reducers[reducer](previousState, action);
        }
        return newState;
    }
}

export const applyMiddlewares = (store, ...middlewares) => {
    middlewares = middlewares.reverse();
    let dispatch = store.dispatch;
    middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)));
    return Object.assign({}, store, {dispatch});
}

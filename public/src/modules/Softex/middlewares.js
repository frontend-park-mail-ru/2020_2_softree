export const thunk = ({dispatch, getState}) => next => action => {
    if (typeof action == 'function') {
        return action(dispatch, getState);
    }

    return next(action);
}

export const logger = store => next => action => {
    console.log('prev state', store.getState());
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

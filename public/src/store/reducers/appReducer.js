import {APP_END_LOADING, APP_START_LOADING, APP_TOGGLE_CONVERTER} from '../types.js';

const initState = {
    loading: false,
    converterIsOpen: false,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case APP_TOGGLE_CONVERTER:
            return {...state, converterIsOpen: !state.converterIsOpen};
        case APP_START_LOADING:
            return { ...state, loading: true };
        case APP_END_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default appReducer;

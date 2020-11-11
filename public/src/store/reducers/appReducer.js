import { appTypes } from '../types.js';

const initState = {
    loading: false,
    converterIsOpen: false,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case appTypes.TOGGLE_CONVERTER:
            return { ...state, converterIsOpen: !state.converterIsOpen };
        case appTypes.START_LOADING:
            return { ...state, loading: true };
        case appTypes.END_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default appReducer;

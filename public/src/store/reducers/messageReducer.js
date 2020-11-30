import { messageTypes } from '../types.js';

const initState = {
    messages: [],
};

export const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case messageTypes.SHOW:
            const { type, message } = action.payload;
            return {...state, messages: [{type, message}, ...state.messages]}
        case messageTypes.HIDE:
            return {...state, messages: state.messages.slice(1,)}
        default:
            return state;
    }
};

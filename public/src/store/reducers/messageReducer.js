import { msgTypeNeutral } from '../../messages/types.js';
import { MESSAGE_SHOW, MESSAGE_HIDE } from '../types.js';

const initState = {
    type: msgTypeNeutral,
    message: '',
    isShowed: false,
};

export const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case MESSAGE_SHOW:
            const { type, message } = action.payload;
            return { ...state, type, message, isShowed: true };
        case MESSAGE_HIDE:
            return { ...state, isShowed: false };
        default:
            return state;
    }
};

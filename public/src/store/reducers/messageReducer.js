import { msgTypes } from '../../messages/types.js';
import { messageTypes } from '../types.js';

const initState = {
    type: msgTypes.NEUTRAL,
    message: '',
    isShowed: false,
};

export const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case messageTypes.SHOW:
            const { type, message } = action.payload;
            return { ...state, type, message, isShowed: true };
        case messageTypes.HIDE:
            return { ...state, isShowed: false };
        default:
            return state;
    }
};

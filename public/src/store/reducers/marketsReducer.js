import { marketsTypes } from '../types';

const init = [];

export const marketReducer = (state = init, action) => {
    switch (action.type) {
        case marketsTypes.SET:
            return action.payload;
        default:
            return state;
    }
};

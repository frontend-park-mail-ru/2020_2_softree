import { initialCurrencyTypes } from '../types.js';

const init = {};

export const initialCurrencyReducer = (state = init, action) => {
    switch (action.type) {
        case initialCurrencyTypes.SET:
            const newState = {};
            action.payload.forEach(currency => newState[currency.title] = currency.value);
            return newState;
        default:
            return state;
    }
};

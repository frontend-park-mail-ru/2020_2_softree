import { currencyTypes } from '../types.js';

const localValue = localStorage.getItem('currency');
const init = localValue ? JSON.parse(localValue) : {};

export const currencyReducer = (state = init, action) => {
    switch (action.type) {
        case currencyTypes.SET:
            // const newState = getNewState(state, action.payload);
            localStorage.setItem('currency', JSON.stringify(action.payload));
            return action.payload;
        default:
            return state;
    }
};

const getNewState = (state, payload) => {
    const newState = {};
    for (let currency in payload) {
        newState[currency] = newCurrency(state, currency, state[currency]);
    }
    return newState;
};

const newCurrency = (state, title, currency) => {
    const currencyState = state[title];
    if (currencyState === undefined) {
        return currency;
    }
    return { ...currencyState, ...currency };
};

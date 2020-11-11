import { currencyTypes } from '../types.js';

const localValue = localStorage.getItem('currency');
const init = localValue
    ? JSON.parse(localValue)
    : {
          USD: {
              value: 1,
              time: 0,
          },
          RUB: {
              value: 0.013,
              time: 1,
          },
          EUR: {
              value: 1.1,
              time: 2,
          },
      };

export const currencyReducer = (state = init, action) => {
    switch (action.type) {
        case currencyTypes.SET:
            const newState = getNewState(state, action.payload);
            localStorage.setItem('currency', JSON.stringify(newState));
            return newState;
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

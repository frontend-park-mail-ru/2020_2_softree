// APP reducer
export const appTypes = {
    START_LOADING: 'app/start-loading',
    END_LOADING: 'app/end-loading',
    TOGGLE_CONVERTER: 'app/toggle_converter',
};

// USER
export const userTypes = {
    SET_DATA: 'user/set-data',
    DROP_DATA: 'user/drop-data',
    SET_AVATAR: 'user/set-avatar',
    START_LOADING: 'user/start-loading',
    END_LOADING: 'user/end-loading',
    SET_ACCOUNTS: 'user/set-accounts',
    SET_HISTORIES: 'user/set-history',
};

//MESSAGE
export const messageTypes = {
    HIDE: 'message/hide',
    SHOW: 'message/show',
};

//currency
export const currencyTypes = {
    SET: 'currency/set',
};

export const marketsTypes = {
    SET: 'markets/set',
};

import { apiCheckAuth, apiMarkets, apiUpdateUser } from '../api.js';
import { appTypes, currencyTypes, marketsTypes, messageTypes, userTypes } from './types';
import { msgTypes } from '../messages/types';
import { jget, jput } from '../modules/jfetch';

// APP
export const startLoading = () => ({ type: appTypes.START_LOADING });
export const endLoading = () => ({ type: appTypes.END_LOADING });
export const toggleConverter = () => ({ type: appTypes.TOGGLE_CONVERTER });

// USER
export const setUserData = data => ({ type: userTypes.SET_DATA, payload: data });
export const dropUserData = () => ({ type: userTypes.DROP_DATA });
export const setAvatar = src => ({ type: userTypes.SET_AVATAR, payload: src });
export const startUserDataLoading = () => ({ type: userTypes.START_LOADING });
export const endUserDataLoading = () => ({ type: userTypes.END_LOADING });

export const fetchUserData = redirectToAuth => {
    return async dispatch => {
        dispatch(startUserDataLoading());
        try {
            const response = await jget(apiCheckAuth());
            dispatch(setUserData(response.data));
        } catch (e) {
            redirectToAuth();
        }
        dispatch(endUserDataLoading());
    };
};

export const setPhoto = src => {
    return async dispatch => {
        try {
            const response = await jput(apiUpdateUser(), { avatar: src });
            dispatch(setAvatar(src));
            syncShowMessage(dispatch, 'Фотография успешно обновлена!', msgTypes.SUCCESS);
        } catch (e) {
            syncShowMessage(dispatch, 'Упс, что-то пошло не так(', msgTypes.FAIL);
        }
    };
};

export const hideMessage = () => ({ type: messageTypes.HIDE });
export const showMessage = (message, type, timeout = 2000) => {
    return async dispatch => {
        dispatch({ type: messageTypes.SHOW, payload: { message, type } });
        setTimeout(() => dispatch(hideMessage()), timeout);
    };
};

const syncShowMessage = (dispatch, message, type, timeout = 2000) => {
    dispatch({ type: messageTypes.SHOW, payload: { message, type } });
    setTimeout(() => dispatch(hideMessage()), timeout);
};

//Currency

export const setCurrency = list => {
    return async dispatch => {
        let store = {};
        list.forEach(currency => {
            const { title, value, updated_at } = currency;
            store = { ...store, [title]: { value, updated_at } };
        });
        dispatch({ type: currencyTypes.SET, payload: store });
    };
};

export const setMarkets = markets => ({ type: marketsTypes.SET, payload: [markets] });
export const fetchMarkets = () => {
    return async dispatch => {
        try {
            const response = await jget(apiMarkets());
            dispatch(setMarkets(response.data));
        } catch (e) {
            syncShowMessage(dispatch, 'Не удалось получить котировки (', msgTypes.FAIL);
        }
    };
};

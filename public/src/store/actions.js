
import { apiCheckAuth, apiUpdateUser } from '../api.js';
import { jget, jpatch } from '../modules/jfetch.js';
import { msgTypeFail, msgTypeSuccess } from '../messages/types.js';
import { appTypes, messageTypes, userTypes } from "./types";

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
            const response = await jpatch(apiUpdateUser(), { avatar: src });
            dispatch(setAvatar(src));
            syncShowMessage(dispatch, 'Фотография успешно обновлена!', msgTypeSuccess);
        } catch (e) {
            syncShowMessage(dispatch, 'Упс, что-то пошло не так(', msgTypeFail);
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

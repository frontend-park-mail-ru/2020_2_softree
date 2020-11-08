import {
    APP_START_LOADING,
    APP_END_LOADING,
    USER_SET_DATA,
    USER_DROP_DATA,
    USER_START_LOADING,
    USER_END_LOADING,
    USER_SET_AVATAR, APP_TOGGLE_CONVERTER,
} from './types.js';
import { apiCheckAuth, apiUpdateUser } from '../api.js';
import { jget, jpatch } from '../modules/jfetch.js';
import { MESSAGE_HIDE, MESSAGE_SHOW } from './types.js';
import { msgTypeFail, msgTypeSuccess } from '../messages/types.js';

// APP
export const startLoading = () => ({ type: APP_START_LOADING });
export const endLoading = () => ({ type: APP_END_LOADING });
export const toggleConverter = () => ({type: APP_TOGGLE_CONVERTER});

// USER
export const setUserData = data => ({ type: USER_SET_DATA, payload: data });
export const dropUserData = () => ({ type: USER_DROP_DATA });
export const setAvatar = src => ({ type: USER_SET_AVATAR, payload: src });
export const startUserDataLoading = () => ({ type: USER_START_LOADING });
export const endUserDataLoading = () => ({ type: USER_END_LOADING });

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
            syncShowMessage(
                dispatch,
                'Фотография успешно обновлена!',
                msgTypeSuccess,
            );
        } catch (e) {
            syncShowMessage(dispatch, 'Упс, что-то пошло не так(', msgTypeFail);
        }
    };
};

export const hideMessage = () => ({ type: MESSAGE_HIDE });
export const showMessage = (message, type, timeout = 2000) => {
    return async dispatch => {
        dispatch({ type: MESSAGE_SHOW, payload: { message, type } });
        setTimeout(() => dispatch(hideMessage()), timeout);
    };
};

const syncShowMessage = (dispatch, message, type, timeout = 2000) => {
    dispatch({ type: MESSAGE_SHOW, payload: { message, type } });
    setTimeout(() => dispatch(hideMessage()), timeout);
};

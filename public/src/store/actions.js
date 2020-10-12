import { appStartLoading, appEndLoading, userSetData, userDropData, userStartLoading, userEndLoading, userSetAvatar } from './types.js';
import { apiCheckAuth, apiUpdateUser } from '../api.js';
import { jget, jpatch } from '../modules/jfetch.js';
import {MESSAGE_HIDE, MESSAGE_SHOW} from "./types.js";
import {msgTypeFail, msgTypeSuccess} from "../messages/types.js";

// APP
export const startLoading = () => ({ type: appStartLoading });
export const endLoading = () => ({ type: appEndLoading });

// USER
export const setUserData = (data) => ({ type: userSetData, payload: data });
export const dropUserData = () => ({ type: userDropData });
export const setAvatar = src => ({ type: userSetAvatar, payload: src });
export const startUserDataLoading = () => ({ type: userStartLoading });
export const endUserDataLoading = () => ({ type: userEndLoading });

export const fetchUserData = (redirectToAuth) => {
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

export const setPhoto = (src) => {
    return async dispatch => {
        try {
            const response = await jpatch(apiUpdateUser(), { avatar: src })
            dispatch(setAvatar(src));
            dispatch(showMessage("Фотография успешно обновлена!", msgTypeSuccess))
        } catch (e) {
            dispatch(showMessage("Упс, что-то пошло не так(", msgTypeFail))
        }
    };
};


export const hideMessage = () => ({type: MESSAGE_HIDE})
export const showMessage = (message, type, timeout = 2000) => {
    return async dispatch => {
        dispatch({type: MESSAGE_SHOW, payload: {message, type}})
        setTimeout(() => dispatch(hideMessage()), timeout)
    }
}

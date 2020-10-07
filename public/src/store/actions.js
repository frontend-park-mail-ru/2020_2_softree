import {appStartLoading, appEndLoading, userSetData, userDropData, userStartLoading, userEndLoading} from './types.js';
import {apiCheckAuth, apiUpdateUser} from '../api.js';
import {jget, jpatch} from '../modules/jfetch.js';
import {userSetAvatar} from "./types.js";


//APP
export const startLoading = () => ({type: appStartLoading});
export const endLoading = () => ({type: appEndLoading});

//USER
export const setUserData = (data) => ({type: userSetData, payload: data});
export const dropUserData = () => ({type: userDropData});
export const setAvatar = src => ({type: userSetAvatar, payload: src});
export const startUserDataLoading = () => ({type: userStartLoading});
export const endUserDataLoading = () => ({type: userEndLoading});

export const fetchUserData = (redirectToAuth) => {
    return async dispatch => {
        dispatch(startUserDataLoading());
        try {
            const response = await jget(apiCheckAuth())
            console.log(response)
            console.log('userData', response.data);
            dispatch(setUserData(response.data));
        } catch (e) {
            redirectToAuth();
        }
        dispatch(endUserDataLoading());
    }
}

export const setPhoto = (src) => {
    return async dispatch => {
        jpatch(apiUpdateUser(), {avatar : src});
        dispatch(setAvatar(src));
    }
}

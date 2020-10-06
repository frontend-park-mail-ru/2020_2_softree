import {appStartLoading, appEndLoading, userSetData, userDropData} from "./types.js";
import {apiCheckAuth} from "../api.js";
import {jget} from "../modules/jfetch.js";

export const startLoading = () => ({type: appStartLoading});

export const endLoading = () => ({type: appEndLoading});

export const setUserData = (data) => ({type: userSetData, payload: data});
export const dropUserData = () => ({type: userDropData});
export const setAvatar = src => ({type: userSetAvatar, payload: src});

export const fetchUserData = (redirectToAuth) => {
    return async dispatch => {
        dispatch(startLoading());
        const response = await jget(apiCheckAuth())
        if (response.status === 200) {
            const data = await response.json();
            dispatch(setUserData(data));
        } else {
            redirectToAuth();
        }
        dispatch(endLoading());
    }
}

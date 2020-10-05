import {appStartLoading, appEndLoading} from "./types.js";

export const startLoading = () => ({type: appStartLoading});

export const endLoading = () => ({type: appEndLoading});

export const fetchUserData = () => {
    return dispatch => {
    }
}

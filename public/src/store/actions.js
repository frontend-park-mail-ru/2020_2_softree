import {appStartLoading, appEndLoading, userSetData, userDropData, userStartLoading, userEndLoading} from "./types.js";
import {apiCheckAuth} from "../api.js";
import {jget} from "../modules/jfetch.js";


//APP
export const startLoading = () => ({type: appStartLoading});
export const endLoading = () => ({type: appEndLoading});

//USER
export const setUserData = (data) => ({type: userSetData, payload: data});
export const dropUserData = () => ({type: userDropData});
export const startUserDataLoading = () => ({type: userStartLoading});
export const endUserDataLoading = () => ({type: userEndLoading});

export const fetchUserData = (redirectToAuth) => {
    return async dispatch => {
        dispatch(startUserDataLoading());
        try {
            const {data} = await jget(apiCheckAuth())
            dispatch(setUserData(data));
        } catch (e) {
            redirectToAuth();
        }
        dispatch(endUserDataLoading());
    }
}

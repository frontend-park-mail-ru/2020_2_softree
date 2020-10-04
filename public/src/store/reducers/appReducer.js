import {appEndLoading, appStartLoading} from "../types.js";

const initState = {
    loading: false
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case appStartLoading:
            return {...state, loading: true};
        case appEndLoading:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default appReducer;

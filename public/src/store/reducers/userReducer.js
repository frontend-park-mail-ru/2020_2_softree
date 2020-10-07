import {userEndLoading, userStartLoading, userDropData, userSetAvatar, userSetData} from "../types.js";

const initState = {
    userData: null,
    loading: false
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case userSetData:
            return {...state, userData: action.payload};
        case userSetAvatar:
            return {...state, avatar: action.payload};
        case userDropData:
            return {...state, userData: null};
        case userStartLoading:
            return {...state, loading: true};
        case userEndLoading:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default userReducer;

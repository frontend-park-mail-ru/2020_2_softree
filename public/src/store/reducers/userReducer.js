import {userEndLoading, userSetData, userStartLoading} from '../types.js';

const initState = {
    userData: null,
    loading: false
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case userSetData:
            return {...state, userData: action.payload};
        case userStartLoading:
            return {...state, loading: true};
        case userEndLoading:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default userReducer;

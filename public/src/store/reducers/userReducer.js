import {userDropData, userSetAvatar, userSetData} from "../types.js";

const initState = {
    userData: null
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case userSetData:
            return {...state, userData: action.payload};
        case userSetAvatar:
            return {...state, avatar: action.payload};
        case userDropData:
            return {...state, userData: null};
        default:
            return state;
    }
}

export default userReducer;

import {userSetAvatar, userSetData} from "../types.js";

const initState = {
    userData: null
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case userSetData:
            return {...state, userData: action.payload};
        case userSetAvatar:
            return {...state, avatar: action.payload};
        default:
            return state;
    }
}

export default userReducer;

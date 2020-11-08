import {
    USER_END_LOADING,
    USER_START_LOADING,
    USER_DROP_DATA,
    USER_SET_AVATAR,
    USER_SET_DATA,
} from '../types.js';

const initState = {
    userData: {
        email: null,
        avatar: null,
    },
    loading: false,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_SET_DATA:
            return { ...state, userData: action.payload };
        case USER_SET_AVATAR:
            return {
                ...state,
                userData: { ...state.userData, avatar: action.payload },
            };
        case USER_DROP_DATA:
            return { ...state, userData: { email: null, avatar: null } };
        case USER_START_LOADING:
            return { ...state, loading: true };
        case USER_END_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default userReducer;

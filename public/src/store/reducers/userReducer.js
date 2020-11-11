import { userTypes } from '../types.js';

const initState = {
    userData: {
        email: null,
        avatar: null,
    },
    loading: false,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userTypes.SET_DATA:
            return { ...state, userData: action.payload };
        case userTypes.SET_AVATAR:
            return {
                ...state,
                userData: { ...state.userData, avatar: action.payload },
            };
        case userTypes.DROP_DATA:
            return { ...state, userData: { email: null, avatar: null } };
        case userTypes.START_LOADING:
            return { ...state, loading: true };
        case userTypes.END_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default userReducer;

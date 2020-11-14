import { userTypes } from '../types.js';

const initState = {
    userData: {
        email: null,
        avatar: null,
    },
    loading: false,
    accounts: [],
    histories: [],
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
            return { ...state, userData: { email: null, avatar: null }, loading: false, accounts: [], histories: [] };
        case userTypes.START_LOADING:
            return { ...state, loading: true };
        case userTypes.END_LOADING:
            return { ...state, loading: false };
        case userTypes.SET_ACCOUNTS:
            return { ...state, accounts: action.payload };
        case userTypes.SET_HISTORIES:
            return { ...state, histories: action.payload };
        default:
            return state;
    }
};

export default userReducer;

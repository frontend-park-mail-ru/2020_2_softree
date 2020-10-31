import { combineReducer } from '../../modules/Softex/Softex.js';
import userReducer from './userReducer.js';
import appReducer from './appReducer.js';
import { messageReducer } from './messageReducer.js';

const rootReducer = combineReducer({
    user: userReducer,
    app: appReducer,
    message: messageReducer,
});

export default rootReducer;

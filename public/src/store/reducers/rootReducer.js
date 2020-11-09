import { combineReducer } from '../../modules/Softex/Softex.js';
import userReducer from './userReducer.js';
import appReducer from './appReducer.js';
import { messageReducer } from './messageReducer.js';
import { currencyReducer } from './currencyReducer.js';

const rootReducer = combineReducer({
    user: userReducer,
    app: appReducer,
    message: messageReducer,
    currency: currencyReducer,
});

export default rootReducer;

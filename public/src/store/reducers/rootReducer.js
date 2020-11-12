import { combineReducer } from '../../modules/Softex/Softex.js';
import userReducer from './userReducer.js';
import appReducer from './appReducer.js';
import { messageReducer } from './messageReducer.js';
import { currencyReducer } from './currencyReducer.js';
import { marketReducer } from './marketsReducer';

const rootReducer = combineReducer({
    user: userReducer,
    app: appReducer,
    message: messageReducer,
    currency: currencyReducer,
    markets: marketReducer,
});

export default rootReducer;

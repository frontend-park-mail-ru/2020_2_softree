import {combineReducer} from "../../modules/Softex/Softex.js";
import userReducer from "./userReducer.js";
import appReducer from "./appReducer.js";

const rootReducer = combineReducer({
    user: userReducer,
    app: appReducer,
});

export default rootReducer;

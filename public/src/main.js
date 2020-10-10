'use strict';

import { Softer } from './modules/Softer/Softer.js';
import App from './components/App.js';
import { applyMiddlewares, createStore } from './modules/Softex/Softex.js';
import rootReducer from './store/reducers/rootReducer.js';
import { thunk, logger } from './modules/Softex/middlewares.js';
import {Message} from "./messages/Message.js";


const softer = new Softer();
softer.connectStore(applyMiddlewares(createStore(rootReducer), thunk));

softer.initApp(document.getElementById('root'), App);
softer.initApp(document.getElementById('message'), Message);

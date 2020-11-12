'use strict';

import { Softer } from './modules/Softer/Softer.js';
import App from './components/App.js';
import { applyMiddlewares, createStore } from './modules/Softex/Softex.js';
import rootReducer from './store/reducers/rootReducer.js';
import { thunk, logger } from './modules/Softex/middlewares.js';
import { Message } from './messages/Message.js';
import Converter from './components/Converter/Converter.js';

import './index.css';

const softer = new Softer();
softer.connectStore(applyMiddlewares(createStore(rootReducer), logger, thunk));

window.softer = softer;

softer.initApp(document.getElementById('root'), App);
softer.initApp(document.getElementById('message'), Message);
softer.initApp(document.getElementById('converter'), Converter);

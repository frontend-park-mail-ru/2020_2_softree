'use strict';

import { Softer } from './modules/Softer/Softer.js';
import App from './components/App.js';
import { applyMiddlewares, createStore } from './modules/Softex/Softex.js';
import rootReducer from './store/reducers/rootReducer.js';
import { thunk, logger } from './modules/Softex/middlewares.js';
import { Message } from './messages/Message.js';
import Converter from './components/Converter/Converter.js';

import './index.scss';

const softer = new Softer();
softer.connectStore(applyMiddlewares(createStore(rootReducer), logger, thunk));

window.softer = softer;

softer.initApp(document.getElementById('root'), App);
softer.initApp(document.getElementById('message'), Message);
softer.initApp(document.getElementById('converter'), Converter);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/serviceWorker.js', { scope: '/' })
        .then(registration => {
            if (registration.installing) {
                const data = {
                    type: 'CACHE_URLS',
                    payload: [location.href, ...performance.getEntriesByType('resource').map(r => r.name)],
                };
                registration.installing.postMessage(data);
            }
        })
        .catch(err => console.log('SW registration FAIL:', err));
}

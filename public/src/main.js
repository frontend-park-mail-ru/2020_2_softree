'use strict';

import { Softer } from './modules/Softer/Softer';
import App from './components/App';
import { applyMiddlewares, createStore } from './modules/Softex/Softex';
import rootReducer from './store/reducers/rootReducer';
import { thunk, logger } from './modules/Softex/middlewares';
import Converter from './components/Converter/Converter';

import './index.scss';
import Messages from "./messages/Messages";

const softer = new Softer();
softer.connectStore(applyMiddlewares(createStore(rootReducer), logger, thunk));

window.softer = softer;

softer.initApp(document.getElementById('root'), App);
softer.initApp(document.getElementById('message'), Messages);
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

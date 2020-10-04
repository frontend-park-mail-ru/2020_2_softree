'use strict'

import {Softer} from "./modules/Softer/Softer.js";
import App from "./components/App.js";
import {createStore} from "./modules/Softex/Softex.js";
import rootReducer from "./store/reducers/rootReducer.js";

const root = document.getElementById('root');
const softer = new Softer();
softer.connectStore(createStore(rootReducer))

softer.initApp(root, App);

'use strict'

import {Softer} from "./modules/Softer/Softer.js";
import App from "./components/App.js";

const root = document.getElementById('root');
const softer = new Softer();

softer.initApp(root, App);

'use strict'

import {Render} from "./modules/Softer/Softer.js";
import App from "./components/App.js";

const root = document.getElementById('root');
const app = new App();

window.render = () => Render(root, app.render());

window.onpopstate = e => {
    e.preventDefault();
    window.render();
}

window.render()

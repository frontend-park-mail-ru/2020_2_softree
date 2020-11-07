'use strict';


const express = require('express');
const chokidar = require("chokidar");
const socket = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/public`));

const port = 3000;

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

const server = app.listen(port, () => {
    console.log(`Ready on http://localhost:${port}`);
});


const watcher = chokidar.watch("./public");

const io = socket(server);

io.on('connection', function(){ console.log('socket connection')});

watcher.on("ready", function () {

    watcher.on("all", function () {
        console.log("Reloading server...");
        io.emit("browserReload");

        Object.keys(require.cache).forEach(function (id) {

            const localId = id.substr(process.cwd().length);

            if (!localId.match(/^\/public\//)) return;

            delete require.cache[id];
        });
        console.log("Server reloaded.");
    });
});



'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});

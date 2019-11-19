const http = require('http');
const express = require('express');
const path = require('path');

const util = require('./util');
const reqController = require('./reqController');
const config = require('./config');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
const router = express.Router();
app.use('/', router);

config.controller.forEach((item, index) => {
    router.route(item.path)[item.method](reqController[item.func])
});
http
    .createServer(app)
    .listen(config.server.port, () => {
        console.log('web server is ready : ' + config.server.port)
    })

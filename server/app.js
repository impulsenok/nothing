const env             = process.env.NODE_ENV || 'development';

const express         = require('express');
const userAgent       = require('express-useragent');
const bodyParser      = require('body-parser');
const path            = require('path');

const app             = express();
const server          = require('http').Server(app);
const io              = require('socket.io')(server);

import ioProcessing from "./lib/io_processing";


app.use(userAgent.express());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public/'), { index: false }));

io.on('connection', socket => {
    const socketInstance = new ioProcessing(io, socket);
    socketInstance.launch();
});

app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('port', process.env.PORT || 9000);

// info
server.listen(app.get('port'), () => {
    if (env !== 'production') {
        console.log('Express server listening on port ' + server.address().port);
    }
});

module.exports = app;

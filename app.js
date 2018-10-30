const express = require('express');
const app = express();
const server =  require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 3000 || process.env.PORT;

const terminal = require('./controllers/terminalController.js');
const browser = require('./controllers/browserController.js');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){

    res.render('index', {
        css_file : '/css/index.css',
        js_file : '/js/index.js'
    });
});

io.on('connection', function(socket) {
    terminal(app, io, socket);
    browser(app, io, socket);
});


server.listen(port, '0.0.0.0', function() {
    console.log(`listening to requests on port ${port}`);
});
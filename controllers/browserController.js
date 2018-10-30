

module.exports = function(app, io, socket) {
    let socketsInfo = [];

    class Browser {
        constructor() {
            socketsInfo.push({
                id: socket.id
            });
        }
        socketEvents() {
            socket.on('ready', function () {
                console.log('back-end');
                io.emit('test');
            });
        }

    }

    let browser = new Browser(app, io, socket);
    browser.socketEvents();
};
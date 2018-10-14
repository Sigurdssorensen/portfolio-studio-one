// Private goes here

module.exports = function(app, io, socket) {
    class Something {
        constructor() {}

        socketEvents() {
            socket.on('ready', function() {
                console.log('back-end');
                io.emit('test');
            });
            socket.on('entryRequest', function(entry){
                // check data
                let data = 'test data';
                io.emit('entryResponse', data);
            });
        }

    }

    let something = new Something(app, io, socket);
    something.socketEvents();
};
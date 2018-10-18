const lib = require('../lib/lib.module');

// Private goes here

module.exports = function(app, io, socket) {
    let socketsInfo = [];

    class Terminal {
        constructor() {
            socketsInfo.push({
                id: socket.id,
                internalPath: 0
            });
        }

        socketEvents() {
            socket.on('ready', function() {
                console.log('back-end');
                io.emit('test');
            });

            socket.on('entryRequest', async function(entry, currentPath){
                // check data
                let variables = {
                    socketInfo: {},
                    command: entry[0],
                    attribute: entry[1],
                    currentPath: currentPath
                };

                variables.socketInfo = await getSocketInfo();

                let commandKeys = Object.keys(lib.COMMANDS);
                let variableKeys = Object.keys(variables);
                let data;

                data = await getResponse(variables, variableKeys, commandKeys);

                socket.emit('entryResponse', data);

            });

            // Util functions
            async function getResponse(variables, variableKeys, commandKeys) {

                let output;

                for (let key of commandKeys) {

                    if (key === variables.command) {
                        // check for input requirements
                        let reqParams = lib.COMMANDS[key].requiredParams;
                        let params = [];

                        for (let key of variableKeys) {

                            if (reqParams.includes(key)) {
                                params.push(variables[key]);
                            }
                        }
                        // perform function call
                        output = await lib.COMMANDS[key].action(params);
                    }
                }
                return output;
            }

            async function getSocketInfo() {
                for(let index of socketsInfo) {
                    if(index.id = socket.id) {
                        return index;
                    }
                }
            }
        };
    }

    let terminal = new Terminal(app, io, socket);
    terminal.socketEvents();
};
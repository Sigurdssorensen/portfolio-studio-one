const PATHS = [
    {
        header: 'Home',
        path: 'C:\\Home>',
        subPaths: [
            {
                header: 'Projects',
                path: 'C:\\Home\\Projects>',
                subPaths: [
                    {
                        header: 'This portfolio',
                        path: 'C:\\Home\\Projects\\Portfolio',
                        tech: ['Node', 'Express', 'JQuery', 'HTML', 'CSS', 'SCSS', 'EJS', 'Socket.io'],
                        action: function () {
                            // return everything needed to render as function?
                            // or directly from command?
                        }
                    },
                    {
                        header: 'MinerMiner',
                        path: 'C:\\Home\\Projects\\MinerMiner'
                    }
                ]
            },
            {
                header: 'About the Author',
                path: 'C:\\Home\\About>'
            }
        ]
    }
];

const COMMANDS = {
    cd: {
        requiredParams: ['currentPath', 'attribute'],
        action: async function(params) {
            let currentPath = params[0],
                requestedPath = params[1];

                // get path

                // get path content?
            return 'test';
        }
    },
    dir: {
        requiredParams: ['socketInfo'],
        action: async function(params) {
            let socketInfo = params[0];
            let path = PATHS[socketInfo.internalPath];

            //console.log(PATHS);
            // get directories in current path
            //let keys = Object.keys(PATHS[path].header);
            if(path.subPaths) {

                let output = [];

                for(let index of path.subPaths) {
                    output.push(index.header);
                }

                return output;
            } else {

                return null;
            }
        }
    },
    start: {
        requiredParams: [],
        action: async function(params) {

        }
    },
    taskkill: {
        requiredParams: [],
        action: async function(params) {

        }
    },
    help: {
        requiredParams: [],
        action: async function(params) {

        }
    }
};

module.exports = {
    PATHS: PATHS,
    COMMANDS: COMMANDS
};

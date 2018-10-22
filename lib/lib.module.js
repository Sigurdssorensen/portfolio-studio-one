const _ = require('lodash');

const PATHS = [
    {
        header: 'Home',
        path: 'C:/Home>',
        parentHeader: null,
        subPaths: [
            {
                header: 'Projects',
                date: 'dd/mm/yyyy   ',
                path: 'C:/Home/Projects>',
                parentHeader: 'Home',
                subPaths: [
                    {
                        header: 'This portfolio',
                        date: 'dd/mm/yyyy   ',
                        path: 'C:/Home/Projects/Portfolio>',
                        parentHeader: 'Projects',
                        tech: ['Node', 'Express', 'JQuery', 'HTML', 'Bootstrap', 'CSS', 'SCSS', 'EJS', 'Socket.io'],
                        action: function () {
                            // return everything needed to render as function?
                            // or directly from command?
                        }
                    },
                    {
                        header: 'MinerMiner',
                        date: 'dd/mm/yyyy   ',
                        path: 'C:/Home/Projects/MinerMiner>',
                        parentHeader: 'Projects',
                        tech: ['Node', 'Express', 'JQuery', 'HTML', 'Bootstrap', 'CSS', 'EJS', 'Sessions']
                    }
                ]
            },
            {
                header: 'About the Author',
                date: 'dd/mm/yyyy   ',
                path: 'C:/Home/About>',
                parentHeader: 'Home',
            }
        ]
    }
];

const pathfinder = [
    PATHS[0],
    PATHS[0].subPaths[0],
    PATHS[0].subPaths[1],
    PATHS[0].subPaths[0].subPaths[0],
    PATHS[0].subPaths[0].subPaths[1],
];


const COMMANDS = {
    cd: {
        requiredParams: ['attribute', 'currentPath'],
        action: async function (params) {

            let requestedPath = params[0].toLowerCase(),
                currentPath = params[1];

            requestedPath = capitalizeFirstLetter(requestedPath);

            if (requestedPath === '..') {
                if (currentPath === 'C:/Home>') {
                    return null;
                } else {
                    for (let path of pathfinder) {
                        if (path.path === currentPath) {
                            requestedPath = path.parentHeader;
                        }
                    }
                }
            }

            for (let path of pathfinder) {
                if (path.header === requestedPath) {
                    return {
                        path: path.path
                    }
                }
            }
            return null;
        }
    },
    dir: {
        requiredParams: ['currentPath'],
        action: async function (params) {
            let currentPath = params[0];

            for (let path of pathfinder) {
                if (path.path === currentPath) {
                    if ('subPaths' in path) {
                        let output = [];
                        for (let val of path.subPaths) {
                            output.push(val.header);
                        }
                        return {
                            text: output
                        }
                    }
                }
            }
            return null;
        }
    },
    start: {
        requiredParams: [],
        action: async function (params) {
        }
    },
    taskkill: {
        requiredParams: [],
        action: async function (params) {
        }
    },
    help: {
        requiredParams: [],
        action: async function (params) {
        }
    }
};

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    PATHS: PATHS,
    COMMANDS: COMMANDS
};

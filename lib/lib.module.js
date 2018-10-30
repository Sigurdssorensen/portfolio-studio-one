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
                        header: 'Portfolio',
                        date: 'dd/mm/yyyy   ',
                        path: 'C:/Home/Projects/Portfolio>',
                        parentHeader: 'Projects',
                        tech: ['Node', 'Express', 'JQuery', 'HTML', 'Bootstrap', 'CSS', 'SCSS', 'EJS', 'Socket.io'],
                        display: 'portfolio'
                    },
                    {
                        header: 'Miner Miner',
                        date: 'dd/mm/yyyy   ',
                        path: 'C:/Home/Projects/MinerMiner>',
                        parentHeader: 'Projects',
                        tech: ['Node', 'Express', 'JQuery', 'HTML', 'Bootstrap', 'CSS', 'EJS', 'Sessions'],
                        display: 'minerminer'
                    }
                ]
            },
            {
                header: 'About the Author',
                date: 'dd/mm/yyyy   ',
                path: 'C:/Home/About>',
                parentHeader: 'Home',
                display: 'about'
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
        requiredParams: ['attribute', 'currentPath'],
        action: async function (params) {
            let requestedFile = params[0],
                currentPath = params[1];

            let output;

            for(let path of pathfinder) {
                if(path.path === currentPath) {
                    if('subPaths' in path) {
                        console.log('subpath is present');
                        for(let val of path.subPaths) {
                            console.log(requestedFile.toLowerCase());
                            console.log(val.header.toLowerCase());
                            if(requestedFile === val.header.toLowerCase()) {
                                console.log('subpath found');
                                return {
                                    cssId: val.display
                                }
                            }
                        }
                    }
                }
            }
            return null;
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
            let output = [
                'CD Changes from the current directory',
                'DIR Displays a list of files and subdirectories of the current directory',
                'START Renders the selected file in a separate window',
                'TASKKILL Stops the current running file'
            ];
            return {
                text: output
            }
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

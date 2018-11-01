const PATHS = [
    {
        header: 'Home',
        path: 'C:/Home>',
        parentHeader: null,
        type: 'DIR',
        subPaths: [
            {
                header: 'Projects',
                date: 'dd/mm/yyyy   ',
                path: 'C:/Home/Projects>',
                parentHeader: 'Home',
                type: 'DIR',
                subPaths: [
                    {
                        header: 'Portfolio',
                        date: 'dd/mm/yyyy   ',
                        path: 'C:/Home/Projects/Portfolio>',
                        parentHeader: 'Projects',
                        type: 'FILE',
                        display: 'portfolio'
                    },
                    {
                        header: 'Miner Miner',
                        date: 'dd/mm/yyyy   ',
                        path: 'C:/Home/Projects/MinerMiner>',
                        parentHeader: 'Projects',
                        type: 'FILE',
                        display: 'minerminer'
                    }
                ]
            },
            {
                header: 'About the Author',
                date: 'dd/mm/yyyy   ',
                path: 'C:/Home/About>',
                parentHeader: 'Home',
                type: 'FILE',
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
                        path: path.path,
                        cd: true
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
                            let space = '';
                            if(val.type === 'DIR') {
                                space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                            } else {
                                space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                            }
                            output.push(val.type + space +val.header);
                        }
                        return {
                            text: output,
                            dir: true
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
                        for(let val of path.subPaths) {
                            console.log(requestedFile.toLowerCase());
                            console.log(val.header.toLowerCase());
                            if(requestedFile === val.header.toLowerCase()) {
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
                'Commands:',
                'CD &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Move between directories.',
                'DIR &nbsp;&nbsp;&nbsp;&nbsp; Displays a list of files.',
                'START &nbsp;&nbsp; Runs the selected file.',
                'TASKKILL Stops the current file.',
                '',
                'Info:',
                "Directories are marked with the 'DIR' tag.",
                "Files are marked with the 'FILE' tag.",
                "Use '..' to move back using the 'CD' command.",
                'You can not move further back than Home'
            ];
            return {
                text: output,
                help: true
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



export const cmd_s = {
    newMsg,
    getInstructions,
    filesStructure,
    createNewFolder,
    findPrevFolder,
    openUrl,
    createTextFile
}

function newMsg(msg) {
    const date = new Date();
    return {
        date: `[${date.toLocaleTimeString()}]`,
        msg
    }
}


function findPrevFolder(data, paths) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].path === paths) {
            return data[i];
        }
        var found = findPrevFolder(data[i].subfolders, paths);
        if (found) return found;
    }
}


function openUrl(url) {
    window.open(`https://${url}`, '_blank');
}


function createNewFolder(name) {
    return {
        id: createId(),
        path: name.toLowerCase(),
        folder: name,
        icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
        subfolders: [],
    }
}

function createTextFile(name) {
    return {
        id: createId(),
        path: name.toLowerCase(),
        folder: name,
        icon: 'https://findicons.com/files/icons/2813/flat_jewels/512/file.png',
        subfolders: [],
        type: 'txt',
        content: ''
    }
}

function filesStructure() {
    return [
        {
            id: "p888",
            path: 'home',
            folder: 'Home',
            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
            subfolders: [
                {
                    id: "pdfg456b4",
                    path: 'files',
                    folder: 'Files',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: [
                        {
                            id: 'dfnhe5h4h',
                            path: 'empty',
                            folder: 'empty.txt',
                            icon: 'https://findicons.com/files/icons/2813/flat_jewels/512/file.png',
                            subfolders: [],
                            type: 'txt',
                            content: 'this is a text\'s file content !'
                        },
                        {
                            id: 'dfg45g4hb34',
                            path: 'empty(1)',
                            folder: 'empty(1).txt',
                            icon: 'https://findicons.com/files/icons/2813/flat_jewels/512/file.png',
                            subfolders: [],
                            type: 'txt',
                            content: ''
                        }
                    ],
                }
            ],
        },
    ]
}


function getInstructions() {
    return [
        {
            date: 'mkdir (ex: mkdir Games)',
            msg: 'creates new directory with the name \"Games\"'
        },
        {
            date: 'rmdir (ex: rmdir Games)',
            msg: 'removes selected directory'
        },
        {
            date: 'ls (ex: ls)',
            msg: 'lists all the directories in the current path'
        },
        {
            date: 'mv (ex: mv Documents NewDocuments)',
            msg: 'changes the name of a directory'
        },
        {
            date: 'cd (ex: cd home)',
            msg: 'enters to the selected directory'
        },
        {
            date: 'cd .. (ex: cd .. (with space in the middle))',
            msg: 'return one level up from a directory'
        },
        {
            date: 'cd path/path/path etc (ex: cd media/music/psytrance)',
            msg: 'specify exact path to a directory'
        },
        {
            date: 'browser (ex: browser www.google.com)',
            msg: 'opens a new tab with the provided url'
        },
        {
            date: 'touch (ex: touch newTextFile)',
            msg: 'creates new text file'
        },
        {
            date: 'exit -',
            msg: 'goes to main page'
        },
        {
            date: 'edit (ex: edit empty.txt)',
            msg: 'opens a text editor for the selected text file'
        },
        {
            date: 'cat (ex: cat empty.txt)',
            msg: 'reads the selected text file (displayed in the terminal)'
        }
    ]
}


function createId(length = 10) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}
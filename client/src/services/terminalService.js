

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
                            path: 'file',
                            folder: 'file.txt',
                            icon: 'https://findicons.com/files/icons/2813/flat_jewels/512/file.png',
                            subfolders: [],
                            type: 'txt',
                            content: 'you can edit this file!'
                        },
                    ],
                },
                {
                    id: 'b53eh2g3',
                    path: 'media',
                    folder: 'Media',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: []
                },
                {
                    id: 'bfg34gh2g3',
                    path: 'shared',
                    folder: 'Shared',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: []
                }
            ],
        },
        {
            id: 'g234g2g3',
            path: 'documents',
            folder: 'Documents',
            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
            subfolders: [
                {
                    id: 'dfnfgh324h',
                    path: 'passwords',
                    folder: 'passwords.txt',
                    icon: 'https://findicons.com/files/icons/2813/flat_jewels/512/file.png',
                    subfolders: [],
                    type: 'txt',
                    content: '######## passwords file ##########\n# user123@host.com /pw - G#@Gg2124FF\n# user33@host.com /pw - VBGD$Gdjkiof2VW$@@\n# userpp@gmail.com /pw - VWERwlo3@@eer3R'
                }
            ]
        }
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
            date: 'edit (ex: edit empty.txt)',
            msg: 'opens a text editor for the selected text file'
        },
        {
            date: 'cat (ex: cat empty.txt)',
            msg: 'reads the selected text file (displayed in the terminal)'
        },
        {
            date: 'exit -',
            msg: 'goes to main page'
        },
        {
            date: 'reset - ',
            msg: 'resets everything (directories ,texts, files, history, etc)'
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
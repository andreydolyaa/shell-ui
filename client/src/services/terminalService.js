

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
                            content: ''
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
        {
            id: "fg35h3h34",
            path: 'media',
            folder: 'Media',
            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
            subfolders: [
                {
                    id: "fb35bh3",
                    path: 'music',
                    folder: 'Music',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: [
                        {
                            id: "b4rth43",
                            path: 'techno',
                            folder: 'Techno',
                            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                            subfolders: [

                            ]
                        },
                        {
                            id: "dfbg34h3",
                            path: 'psytrance',
                            folder: 'Psytrance',
                            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                            subfolders: [

                            ]
                        },
                        {
                            id: "34g34gh3h3",
                            path: 'trap',
                            folder: 'Trap',
                            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                            subfolders: [

                            ]
                        },
                    ]
                },
            ]
        },
        {
            id: "p765",
            path: 'documents',
            folder: 'Documents',
            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
            subfolders: [
                {
                    id: "fedh45h4",
                    path: 'backgrounds',
                    folder: 'Backgrounds',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: [

                    ]
                },
                {
                    id: "erh34h3h",
                    path: 'secrets',
                    folder: 'Secrets',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: [
                        {
                            id: 'vberwh3hb34',
                            path: 'passwords',
                            folder: 'passwords.txt',
                            icon: 'https://findicons.com/files/icons/2813/flat_jewels/512/file.png',
                            subfolders: [],
                            type: 'txt',
                            content: ''
                        },
                        {
                            id: 'ber53h35h',
                            path: 'links',
                            folder: 'links.txt',
                            icon: 'https://findicons.com/files/icons/2813/flat_jewels/512/file.png',
                            subfolders: [],
                            type: 'txt',
                            content: ''
                        }
                    ]
                },
                {
                    id: "fe2g23dh45h4",
                    path: 'paperwork',
                    folder: 'Paperwork',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: [
                        {
                            id: "fefbn45g4",
                            path: 'bank',
                            folder: 'Bank',
                            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                            subfolders: [

                            ]
                        },
                        {
                            id: "fefg345gb534bn45g4",
                            path: 'insurance',
                            folder: 'Insurance',
                            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                            subfolders: [
                                {
                                    id: "b4e5gh3",
                                    path: '2019',
                                    folder: '2019',
                                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                                    subfolders: [

                                    ]
                                },
                                {
                                    id: "trbr4g453g3",
                                    path: '2020',
                                    folder: '2020',
                                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                                    subfolders: [

                                    ]
                                },
                                {
                                    id: "b44grt45ggh3",
                                    path: '2021',
                                    folder: '2021',
                                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                                    subfolders: [

                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    id: "vdf434bg43",
                    path: 'shared',
                    folder: 'Shared',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: [

                    ]
                },
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
            date:'exit -',
            msg:'goes to main page'
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


export const cmd_s = {
    newMsg,
    getInstructions,
    filesStructure,
    createNewFolder
}

function newMsg(msg) {
    const date = new Date();
    return {
        date: `[${date.toLocaleTimeString()}]`,
        msg
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
                    subfolders: [],
                }
            ],
        },
        {
            id: "fg35h3h34",
            path: '1',
            folder: '1',
            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
            subfolders: [
                {
                    id: "fb35bh3",
                    path: '2',
                    folder: '2',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: [
                        {
                            id: "b4rth43",
                            path: '3',
                            folder: '3',
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
                    id: "pdfgb4",
                    path: 'pictures',
                    folder: 'Pictures',
                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                    subfolders: [
                        {
                            id: "pdereggefgb4",
                            path: 'backgrounds',
                            folder: 'Backgrounds',
                            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                            subfolders: [
                                {
                                    id: "pderretgfgb4",
                                    path: 'photoshop',
                                    folder: 'Photoshop',
                                    icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
                                    subfolders: [],
                                }
                            ],
                        }
                    ],
                }
            ],
        }
    ]
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


function getInstructions() {
    return [
        {
            date: ' mkdir + name (ex: mkdir Games)',
            msg: 'creates new directory with the name \"Games\"'
        },
        {
            date: 'rmdir + name (ex: rmdir Games)',
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
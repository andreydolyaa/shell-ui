

export const cmd_s = {
    newMsg,
    getInstructions,
    filesStructure,
    createNewFolder
}

function newMsg(msg) {
    const date = new Date();
    return {
        date: `[${date.toLocaleTimeString()}]~$`,
        msg
    }
}

function getInstructions() {
    return [
        {
            date: 'mkdir + name (ex: mkdir Games)',
            msg: 'creates new directory with the name \"Games\"'
        },
        {
            date: 'rmdir + name (ex: rmdir Games)',
            msg: 'removes selected directory'
        },
        {
            date:'ls (ex: ls)',
            msg:'lists all the directories in the current path'
        }
    ]
}

function filesStructure() {
    return [
        {
            id: "p888",
            path: 'home',
            folder: 'Home',
            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
            subfolders: [],
        },
        {
            id: "p765",
            path: 'documents',
            folder: 'Documents',
            icon: 'https://www.pngkey.com/png/full/392-3921813_flat-folder-icon-png-folder-icon.png',
            subfolders: [],
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
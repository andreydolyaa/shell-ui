import Vue from 'vue';
import Vuex from 'vuex';
import { cmd_s } from './../services/terminalService';
import { storageService } from './../services/storageService';
import router from '../router/index';

Vue.use(Vuex);
const STORAGE_KEY = 'terminaljsfiles';
const STORAGE_KEY_MSG = 'terminaljsmessages';

export default new Vuex.Store({
    state: {
        messages: [],
        cmds: [],
        user: 'root:',
        error: null,
        path: '',
        files: [],
        pathLine: [],
        prevFiles: [],
        prevPath: [],
        structure: [],
        currentFolder: {},
        textEditing: false,
        textFile: {}
    },
    mutations: {
        checkCmd(state, { cmd }) {
            state.messages.push({ date: state.user + '~$', msg: cmd });
            storageService.store(STORAGE_KEY_MSG, state.messages);
            var cmd_chain = cmd.split(" ");
            var path_chain = cmd.split(/[ ,/]/);
            if (cmd === '--help') {
                var help = cmd_s.getInstructions();
                help.map(h => state.messages.push(h));
                storageService.store(STORAGE_KEY_MSG, state.messages);
            }
            else if (cmd === 'cls') {
                this.commit('clearTerminal');
            }
            else if (cmd_chain[0] === 'mkdir' && cmd_chain.length === 2) {
                if (state.files.some(file => file.path.includes(cmd_chain[1]))) {
                    var numOfSameFiles = 1;
                    for (var i = 0; i < state.files.length; i++) {
                        if (state.files[i].folder.includes(numOfSameFiles.toString()) && state.files[i].folder.includes(cmd_chain[1])) numOfSameFiles++;
                    }
                    var newFolder = cmd_s.createNewFolder(cmd_chain[1] + `(${numOfSameFiles})`);
                    state.files.push(newFolder);
                    this.commit({ type: 'setMessage', message: `new directory \"${cmd_chain[1]}\" created` });
                    this.commit('saveToLocalStorage');
                }
                else {
                    var newFolder = cmd_s.createNewFolder(cmd_chain[1]);
                    state.files.push(newFolder);
                    this.commit({ type: 'setMessage', message: `new directory \"${cmd_chain[1]}\" created` });
                    this.commit('saveToLocalStorage');
                }
            }
            else if (cmd_chain[0] === 'rmdir' && cmd_chain.length === 2) {
                const idx = state.files.findIndex(file => file.folder.toLowerCase() === cmd_chain[1].toLowerCase());
                state.files.splice(idx, 1);
                this.commit({ type: 'setMessage', message: `directory \"${cmd_chain[1]}\" removed` });
                this.commit('saveToLocalStorage');
            }
            else if (cmd_chain[0] === 'mv' && cmd_chain.length === 3) {
                const idx = state.files.findIndex(file => file.folder.toLowerCase() === cmd_chain[1].toLowerCase());
                state.files[idx].folder = cmd_chain[2];
                state.files[idx].path = cmd_chain[2].toLowerCase();
                this.commit({ type: 'setMessage', message: `directory \"${cmd_chain[1]}\" changed to \"${cmd_chain[2]}\"` });
                this.commit('saveToLocalStorage');
            }
            else if (cmd === 'ls') {
                state.files.forEach((file, idx) => state.messages.push({ date: idx + 1 + ')', msg: file.folder }));
            }
            else if (cmd_chain[0] === 'cd' && cmd_chain.length === 2 && state.files.some(f => f.path.includes(cmd_chain[1].toLowerCase())) && cmd_chain[1].slice(-4) !== '.txt') {
                const directory = state.files.find(file => file.path === cmd_chain[1].toLowerCase());
                const end = cmd_chain[cmd_chain.length - 1];
                const dest = cmd_s.findPrevFolder(state.structure, end);
                state.currentFolder = dest;
                state.prevPath.push(dest);
                state.prevFiles.push(state.files);
                state.files = directory.subfolders;
                state.path += '/' + directory.folder;
                state.pathLine.push(directory.folder);
                state.user = 'root:' + '/' + state.pathLine.join("/");
            }
            else if (cmd === 'cd ..') {
                if (state.prevFiles.length) {
                    state.prevPath.pop();
                    state.currentFolder = state.prevPath[state.prevPath.length - 1];
                    state.files = state.prevFiles[state.prevFiles.length - 1];
                    state.pathLine.pop();
                    state.prevFiles.pop();
                    state.user = 'root:' + '/' + state.pathLine.join("/");
                }
                if (state.prevFiles.length === 0) {
                    state.files = state.structure;
                    state.currentFolder = {};
                    state.user = 'root:'
                    state.pathLine = [];
                }
            }
            else if (path_chain[0] === 'cd' && path_chain.length >= 3) {
                const end = path_chain[path_chain.length - 1];
                const dest = cmd_s.findPrevFolder(state.structure, end);
                state.files = dest.subfolders;
                state.currentFolder = dest;
                path_chain.shift();
                state.pathLine = path_chain;
                state.user = 'root:' + '/' + state.pathLine.join("/");
            }
            else if (cmd_chain[0] === 'browser' && cmd_chain.length === 2) {
                this.commit({ type: 'setMessage', message: `${cmd_chain[1]} opened in a new tab` });
                cmd_s.openUrl(cmd_chain[1]);
            }
            else if (cmd_chain[0] === 'touch' && cmd_chain.length === 2) {
                if (state.files.some(file => file.path.includes(cmd_chain[1]))) {
                    var numOfSameFiles = 1;
                    for (var i = 0; i < state.files.length; i++) {
                        if (state.files[i].folder.includes(numOfSameFiles.toString()) && state.files[i].folder.includes(cmd_chain[1])) numOfSameFiles++;
                    }
                    var textFile = cmd_s.createTextFile(cmd_chain[1] + `(${numOfSameFiles}).txt`);
                    state.files.push(textFile);
                    this.commit({ type: 'setMessage', message: `new directory \"${cmd_chain[1]}\" created` });
                    this.commit('saveToLocalStorage');
                }
                else {
                    var textFile = cmd_s.createTextFile(cmd_chain[1] + '.txt');
                    state.files.push(textFile);
                    this.commit({ type: 'setMessage', message: `new text file \"${cmd_chain[1]}\" created` });
                    this.commit('saveToLocalStorage');
                }
            }
            else if (cmd === 'exit') {
                state.messages.push(cmd_s.newMsg('shutting down in 3 seconds...'));
                var interval = setInterval(() => {
                    state.files = [];
                    this.dispatch('loadFiles');
                    state.cmds = [];
                    state.user = 'root:';
                    state.error = null;
                    state.path = '';
                    state.pathLine = [];
                    state.prevFiles = [];
                    state.prevPath = [];
                    state.currentFolder = {};
                    state.messages = [cmd_s.newMsg('welcome to terminal.js, this project is still under development :)'), cmd_s.newMsg('type --help for instructions')];
                    clearInterval(interval);
                }, 4000)
            }
            else if (cmd_chain[0] === 'reset') {
                storageService.store(STORAGE_KEY_MSG, null);
                storageService.store(STORAGE_KEY, null);
                router.push('/');
                state.files = [];
                this.dispatch('loadFiles');
                state.cmds = [];
                state.user = 'root:';
                state.error = null;
                state.path = '';
                state.pathLine = [];
                state.prevFiles = [];
                state.prevPath = [];
                state.currentFolder = {};
            }
            else if (cmd_chain[0] === 'edit' && cmd_chain.length === 2 && cmd_chain[1].slice(-4) === '.txt') {
                const fileExists = state.files.findIndex(file => file.folder.toLowerCase() === cmd_chain[1].toLowerCase());
                if (fileExists !== -1) {
                    state.textEditing = true;
                    state.textFile = state.files[fileExists];
                }
                else {
                    this.commit({ type: 'setMessage', message: `file \"${cmd_chain[0]}.txt\" not found in current directory` });
                }
            }
            else if (cmd_chain[0] === 'cat' && cmd_chain.length === 2 && cmd_chain[1].slice(-4) === '.txt') {
                const file = state.files.findIndex(file => file.folder.toLowerCase() === cmd_chain[1].toLowerCase());
                state.messages.push(cmd_s.newMsg(state.files[file].content));
                storageService.store(STORAGE_KEY_MSG, state.messages);
            }
            else {
                this.commit({ type: 'setMessage', message: 'unknown command, type --help for instructions' });
            }
        },
        setMessage(state, { message }) {
            state.messages.push(cmd_s.newMsg(message));
            storageService.store(STORAGE_KEY_MSG, state.messages)
        },
        clearTerminal(state) {
            state.messages = [];
            storageService.store(STORAGE_KEY_MSG, state.messages);
        },
        setFiles(state, files) {
            state.files = files;
            state.structure = files;
        },
        saveTextFile(state, { file }) {
            state.textEditing = false;
            this.commit('saveToLocalStorage');
            this.commit({ type: 'setMessage', message: "file has been saved" })

        },
        saveToLocalStorage(state) {
            storageService.store(STORAGE_KEY, state.structure);
        },
        setMessagesOnLoad(state, { messages }) {
            state.messages = messages;
        }
    },
    getters: {
        getMessages(state) {
            return state.messages;
        },
        getUser(state) {
            return state.user;
        },
        getFiles(state) {
            return state.files;
        },
        getPath(state) {
            return state.path;
        },
        getCmds(state) {
            return state.cmds;
        },
        getStructure(state) {
            return state.structure;
        },
        getPathLine(state) {
            return state.pathLine;
        },
        getCurrentFolder(state) {
            return state.currentFolder;
        },
        getIsEditing(state) {
            return state.textEditing;
        },
        getTextFile(state) {
            return state.textFile;
        }
    },
    actions: {
        loadFiles({ commit }) {
            var storage = storageService.load(STORAGE_KEY);
            if (storage) {
                const files = storage;
                commit('setFiles', files);
            }
            else {
                const files = cmd_s.filesStructure();
                storageService.store(STORAGE_KEY, files);
                commit('setFiles', files);
            }
        },
        loadMessages({ commit }) {
            var storage = storageService.load(STORAGE_KEY_MSG);
            if (storage) {
                this.state.messages = storage;
            } else {
                this.state.messages = [{date:'',msg:cmd_s.asciiArt()},cmd_s.newMsg(`welcome to terminal.js, this project is still under development :)`), cmd_s.newMsg('type --help for instructions')];
                storageService.store(STORAGE_KEY_MSG, this.state.messages);
            }
        }
    },
    modules: {
    }
})


function updateData(structure, newData) {
    const data = findDirectory(structure, newData.id);
    console.log(data);
}


function findDirectory(data, id, update) {
    var x;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return data[i];
        }
        var found = findDirectory(data[i].subfolders, id);
        if (found) {
            found = update;
            data[i] = found;
            x = data;
        }
        return data;
    }
    return x;
}
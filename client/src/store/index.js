import Vue from 'vue';
import Vuex from 'vuex';
import { cmd_s } from './../services/terminalService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messages: [cmd_s.newMsg('welcome to terminal.js'), cmd_s.newMsg('type --help for instructions')],
        cmds: [],
        user: 'root:',
        error: null,
        path: '',
        files: [],
        pathLine: [],
        prevFiles: [],
        prevPath: [],
        structure: [],
        currentFolder: {}
    },
    mutations: {
        checkCmd(state, { cmd }) {
            state.messages.push({ date: state.user, msg: cmd });
            var cmd_chain = cmd.split(" ");
            var path_chain = cmd.split(/[ ,/]/);
            if (cmd === '--help') {
                var help = cmd_s.getInstructions();
                help.map(h => state.messages.push(h));
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
                    state.messages.push(cmd_s.newMsg(`new directory \"${cmd_chain[1]}\" created`));
                }
                else {
                    var newFolder = cmd_s.createNewFolder(cmd_chain[1]);
                    state.files.push(newFolder);
                    state.messages.push(cmd_s.newMsg(`new directory \"${cmd_chain[1]}\" created`));
                }
            }
            else if (cmd_chain[0] === 'rmdir' && cmd_chain.length === 2) {
                const idx = state.files.findIndex(file => file.folder.toLowerCase() === cmd_chain[1].toLowerCase());
                state.files.splice(idx, 1);
                state.messages.push(cmd_s.newMsg(`directory \"${cmd_chain[1]}\" removed`));
            }
            else if (cmd_chain[0] === 'mv' && cmd_chain.length === 3) {
                const idx = state.files.findIndex(file => file.folder.toLowerCase() === cmd_chain[1].toLowerCase());
                state.files[idx].folder = cmd_chain[2];
                state.files[idx].path = cmd_chain[2].toLowerCase();
                state.messages.push(cmd_s.newMsg(`directory \"${cmd_chain[1]}\" changed to \"${cmd_chain[2]}\"`));
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
                state.messages.push(cmd_s.newMsg(`${cmd_chain[1]} opened in a new tab`));
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
                    state.messages.push(cmd_s.newMsg(`new directory \"${cmd_chain[1]}\" created`));
                }
                else {
                    var textFile = cmd_s.createTextFile(cmd_chain[1] + '.txt');
                    state.files.push(textFile);
                    state.messages.push(cmd_s.newMsg(`new text file \"${cmd_chain[1]}\" created`));
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
                    state.messages = [cmd_s.newMsg('welcome to terminal.js'), cmd_s.newMsg('type --help for instructions')];
                    clearInterval(interval);
                }, 4000)
            }
            else {
                state.messages.push(cmd_s.newMsg('unknown command, type --help for instructions'));
            }
        },
        clearTerminal(state) {
            state.messages = [];
        },
        setFiles(state, files) {
            state.files = files;
            state.structure = files;
        },
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
        }
    },
    actions: {
        loadFiles({ commit }) {
            const files = cmd_s.filesStructure();
            commit('setFiles', files);
            return files; // ?
        }
    },
    modules: {
    }
})


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
        structure: [],
        currentFolder: {}
    },
    mutations: {
        checkCmd(state, { cmd }) {
            state.messages.push({ date: state.user, msg: cmd });
            var cmd_chain = cmd.split(" ");
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
            else if (cmd_chain[0] === 'cd' && cmd_chain.length === 2 && state.files.some(f => f.path.includes(cmd_chain[1].toLowerCase()))) {
                const directory = state.files.find(file => file.path === cmd_chain[1].toLowerCase());
                state.currentFolder = directory;
                state.prevFiles.push(state.files);
                console.log('get in : ', state.prevFiles);
                state.files = directory.subfolders;
                state.path += '/' + directory.folder;
                state.pathLine.push(directory.folder);
                state.user = 'root:' + '/' + state.pathLine.join("/");
            }
            else if (cmd === 'cd ..') {
                if (state.prevFiles.length) {
                    state.files = state.prevFiles[state.prevFiles.length - 1];
                    state.pathLine.pop();
                    state.prevFiles.pop();
                    state.currentFolder = state.prevFiles[state.prevFiles.length - 1]
                    state.currentFolder = state.currentFolder[0]
                    console.log('go back: ', state.prevFiles);
                    state.user = 'root:' + '/' + state.pathLine.join("/");

                }
                if (state.prevFiles.length === 0) {
                    state.files = state.structure;
                    state.currentFolder = {};
                    state.user = 'root:'
                }
            }
            else if (cmd_chain[0] === 'browser' && cmd_chain.length === 2) {
                state.messages.push(cmd_s.newMsg(`${cmd_chain[1]} opened in a new tab`));
                cmd_s.openUrl(cmd_chain[1]);
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


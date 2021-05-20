import Vue from 'vue';
import Vuex from 'vuex';
import { cmd_s } from './../services/terminalService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messages: [cmd_s.newMsg('welcome to terminal.js'), cmd_s.newMsg('type --help for instructions')],
        cmds: [],
        user: 'root:~$',
        error: cmd_s.newMsg('unknown command, type --help for instructions'),
        path: 'C:/',
        files: []
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
        }
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
                var newFolder = cmd_s.createNewFolder(cmd_chain[1]);
                state.files.push(newFolder);
                state.messages.push(cmd_s.newMsg(`new directory \"${cmd_chain[1]}\" created`))
            }
            else if (cmd_chain[0] === 'rmdir' && cmd_chain.length === 2) {
                const idx = state.files.findIndex(file => file.folder.toLowerCase() === cmd_chain[1].toLowerCase());
                state.files.splice(idx, 1);
                state.messages.push(cmd_s.newMsg(`directory \"${cmd_chain[1]}\" removed`));
            }
            else if (cmd_chain[0] === 'mv' && cmd_chain.length === 3) {
                const idx = state.files.findIndex(file => file.folder.toLowerCase() === cmd_chain[1].toLowerCase());
                state.files[idx].folder = cmd_chain[2];
                state.messages.push(cmd_s.newMsg(`directory \"${cmd_chain[1]}\" changed to \"${cmd_chain[2]}\"`));
            }
            else if (cmd === 'ls') {
                state.files.forEach((file, idx) => state.messages.push({ date: idx + 1 + ')', msg: file.folder }));
            }
            else {
                state.messages.push(state.error);
            }
        },
        clearTerminal(state) {
            state.messages = [];
        },
        setFiles(state, files) {
            state.files = files;
        }
    },
    actions: {
        loadFiles({ commit }) {
            const files = cmd_s.filesStructure();
            commit('setFiles', files);
        }
    },
    modules: {
    }
})


<template>
	<div class="input">
		<p class="user">{{user}}</p>
		<input ref="input" type="text" @blur="focusInput" v-model="cmd" @keyup.enter="submitCmd();onEnter()"/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cmd: "",
		};
	},
	computed: {
		user() {
			return this.$store.getters.getUser;
		},
        path(){
            return this.$store.getters.getPath;
        }
	},
	methods: {
		focusInput() {
			this.$refs.input.focus();
		},
		submitCmd() {
			this.$store.commit({ type: "checkCmd", cmd: this.cmd });
			this.cmd = "";
		},
        onEnter(){
            this.$emit('cmdEnter');
        }
	},
	mounted() {
		this.focusInput();
	},
};
</script>

<style>
.input {
	display: flex;
	align-items: center;
}
.input input {
	margin-left: 10px;
	border: none;
	background-color: transparent;
	outline: none;
	caret-color: #04bd04;
	width: 100%;
}
.user {
	color: red;
}
</style>


<p :style="[path === '~$' ? {'color':'red'} : {'color':'#2262DA'}]">{{path}}</p>
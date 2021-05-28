<template>
	<div class="input">
		<p class="user">{{user}}~$</p>
		<input ref="input" type="text" @blur="focusInput" v-model="cmd" @keyup.enter="submitCmd();onEnter()" />
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
		path() {
			return this.$store.getters.getPath;
		},
	},
	methods: {
		focusInput() {
			this.$refs.input.focus();
		},
		submitCmd() {
			if (this.cmd === "exit") {
				var interval = setInterval(() => {
					this.exit();
					clearInterval(interval);
				}, 4000);
				this.$store.commit({ type: "checkCmd", cmd: this.cmd });
				this.cmd = "";
			} else {
				this.$store.commit({ type: "checkCmd", cmd: this.cmd });
				this.cmd = "";
			}
		},
		onEnter() {
			this.$emit("cmdEnter");
		},
		exit() {
			this.$router.push("/");
		},
	},
	mounted() {
		this.focusInput();
	},
};
</script>

<style>

.user {
	color: red;
}
</style>


<p :style="[path === '~$' ? {'color':'red'} : {'color':'#2262DA'}]">{{path}}</p>
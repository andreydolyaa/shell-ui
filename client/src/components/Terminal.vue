<template>
	<div class="terminal" ref="terminal">
		<div class="content" v-for="(msg,idx) in messages" :key="idx">
			<div>
				<Message :msg="msg" />
			</div>
		</div>
		<Input @cmdEnter="scrollDown" />
	</div>
</template>

<script>
import Input from "./Input.vue";
import Message from "./Message.vue";
export default {
	components: { Input, Message },
	computed: {
		messages() {
			return this.$store.getters.getMessages;
		},
		cmds() {
			return this.$store.getters.getCmds;
		},
	},
	methods: {
		scrollDown() {
            var x = this.$refs.terminal;
            x.scrollTop = x.scrollHeight
		},
	},
    updated(){
        // document.querySelector('.terminal').scrollTop = document.querySelector('.terminal').scrollHeight;
        this.scrollDown();
    }
};
</script>

<style>
.terminal {
	background-color: #000;
	width: 900px;
	height: 450px;
	padding: 10px;
	overflow-y: scroll;
}
</style>
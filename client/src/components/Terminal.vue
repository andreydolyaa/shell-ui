<template>
	<div class="terminal">
		<div class="content" v-for="(msg,idx) in messages" :key="idx">
			<div>
				<Message :msg="msg" />
			</div>
		</div>
		<Input />
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
        cmds(){
            return this.$store.getters.getCmds;
        }
	},
};
</script>

<style>
.terminal {
	background-color: #000;
	width: 900px;
	height: 400px;
	padding: 10px;
    overflow-y: scroll;
}
</style>
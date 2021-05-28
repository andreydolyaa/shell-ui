<template>
	<div class="message-container">
		<p :style="[msg.date === 'root:~$' || calcChars === '/' ? {'color':'red'} : null]">{{msg.date}}</p>
		<p class="message">{{msg.msg}}</p>
	</div>
</template>

<script>
export default {
	props: {
		msg: Object,
	},
	computed: {
		path() {
			return this.$store.getters.getPath;
		},
		calcChars() {
			return this.msg.date.substring(5, 6);
		},
	},
};
</script>

<style>
.message-container {
	display: flex;
	align-items: center;
}
.message {
	margin-left: 10px;
    white-space: pre-line;
	word-wrap: break-word;
    max-width:770px;
}
</style>


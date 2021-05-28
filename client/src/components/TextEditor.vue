<template>
	<div class="text-editor">
		<textarea ref="input" v-model="textFile.content"></textarea>
	</div>
</template>

<script>
import Input from "./Input.vue";
export default {
	components: { Input },
	computed: {
		textFile() {
			return this.$store.getters.getTextFile;
		},
	},
	methods: {
		focusInput() {
			this.$refs.input.focus();
		},
	},
	mounted() {
		this.focusInput();
		document.onkeydown = (event) => {
			if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
				event.preventDefault();
				this.$store.commit({
					type: "saveTextFile",
					file: this.textFile,
				});
			}
		};
	},
};
</script>

<style>
.text-editor {
	background-color: #000;
	width: 900px;
	height: 450px;
	padding: 10px;
	overflow-y: scroll;
}
textarea {
	max-width: 100%;
	min-width: 100%;
	height: 100%;
	outline: none;
	background-color: black;
	border: none;
	white-space: pre-line;
	word-wrap: break-word;
}
</style>
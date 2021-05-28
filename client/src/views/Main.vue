<template>
	<div class="main">
		<div>
			<Structure />
		</div>
		<div class="tf">
			<div v-if="textEditing">
				<TextEditor />
			</div>
			<div v-else>
				<Terminal />
			</div>
			<FileWindow />
		</div>
	</div>
</template>

<script>
import FileWindow from "../components/FileWindow.vue";
import Structure from "../components/Structure.vue";
import Terminal from "../components/Terminal.vue";
import TextEditor from "../components/TextEditor.vue";

export default {
	computed: {
		textEditing() {
			return this.$store.getters.getIsEditing;
		},
	},
	components: {
		Terminal,
		FileWindow,
		Structure,
		TextEditor,
	},
};
</script>
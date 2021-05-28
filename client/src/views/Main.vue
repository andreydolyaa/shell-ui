<template>
	<div class="main">
		<div>
			<Structure />
		</div>
		<div class="tf">
			<div v-if="textEditing">
				<div class="te">
					<div class="he">
						<Helper />
					</div>
					<TextEditor />
				</div>
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
import Helper from "../components/Helper.vue";
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
		Helper,
	},
};
</script>

<style lang="css">
.te {
	position: relative;
}
.he {
	position: absolute;
    right:10px;
}
</style>
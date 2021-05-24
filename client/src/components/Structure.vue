<template>
	<div class="structure">
		<div v-for="folder in structure" :key="folder.id">
			<Folder :label="folder.folder" :nodes="folder.subfolders" />
		</div>
	</div>
</template>

<script>
import Folder from "./Folder.vue";

export default {
	name: "Structure",
	computed: {
		structure() {
			return this.$store.getters.getStructure;
		},
	},
	components: {
		Folder,
	},
};
</script>

<style>
.structure{
    
}
</style>

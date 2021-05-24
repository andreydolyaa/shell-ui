<template>
	<div class="structure">
        <h3>Directories Structure</h3>
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
    position: absolute;
    left:20px;
    height:750px;
    width:300px;
    background-color: #222;
}
.structure h3{
    color:white;
    text-align: center;
    padding:10px;
    border-bottom: 1px solid #ffffff;
}
</style>

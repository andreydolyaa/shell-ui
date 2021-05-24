<template>
	<div class="folder-r">
		<div>{{label}}</div>
		<Folder v-for="node in nodes" :nodes="node.subfolders" :label="node.folder" :key="node.id" />
	</div>
</template>

<script>
import Folder from "./Folder";
export default {
	name: "Folder",
	props: ["label", "nodes"],
	components: {
		Folder,
	},
};
</script>

<style>
.folder-r{
    margin-left:2rem;
}
</style>
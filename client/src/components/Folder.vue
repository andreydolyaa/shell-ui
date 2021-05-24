<template>
	<div class="folder-r">
		<p>{{label}}</p>
		<Folder v-for="node in nodes" :nodes="node.subfolders" :label="node.folder" :key="node.id" class="inner-folders" />
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
.folder-r {
    margin-left:15px;
}
.folder-r:first-child{
    margin-top:1rem;
}
.inner-folders {
	margin-left: 2rem;
    /* border: 1px solid black; */
}
</style>
<template>
	<div class="folder-r">
		<ul class="icon-label">
			<li>
				<img src="../assets/folder.png" alt />
			</li>
			<li :style="[currentFolder.folder === label ? {'color':'red'} : null]">{{label}}</li>
		</ul>
		<Folder v-for="node in nodes" :nodes="node.subfolders" :label="node.folder" :key="node.id" class="inner-folders" />
	</div>
</template>

<script>
import Folder from "./Folder";
export default {
	name: "Folder",
	props: ["label", "nodes", "folder"],
    computed:{
        currentFolder(){
            return this.$store.getters.getCurrentFolder;
        }
    },
	components: {
		Folder,
	},
};
</script>

<style>
.folder-r {
	margin-left: 15px;
	border-left: 1px dotted gray;
}

.folder-r:first-child {
	margin-top: 1rem;
}
.inner-folders {
	margin-left: 1.2rem;
	border-left: 1px dotted gray;
}
.folder-r img {
	width: 12px;
	margin-right: 5px;
	margin-left: 10px;
}
.icon-label {
	display: flex;
	align-items: center;
	list-style: none;
}
.icon-label li {
	font-size: 12px;
	color: white;
}
</style>
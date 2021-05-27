<template>
	<div class="folder-r">
		<ul class="icon-label">
			<li v-if="folder.folder.slice(-4) === '.txt'" class="txt-img-c">
				<img class="txt-img" :src="icon" alt />
			</li>
			<li v-else>
				<img :src="folder.icon" />
			</li>
			<li :style="[currentFolder.folder === label ? {'color':'#2193FF'} : null]">{{label}}</li>
			<li class="curr-symbol" v-if="currentFolder.folder === label"></li>
		</ul>
		<Folder v-for="node in nodes" :nodes="node.subfolders" :label="node.folder" :folder="node" :icon="node.icon" :key="node.id" class="inner-folders" />
	</div>
</template>

<script>
import Folder from "./Folder";
export default {
	name: "Folder",
	props: ["label", "nodes", "folder", "icon"],
	computed: {
		currentFolder() {
			return this.$store.getters.getCurrentFolder;
		},
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
.curr-symbol {
	margin-left: auto;
	margin-right: 1rem;
	height: 7px;
	width: 7px;
	border-radius: 50%;
	background: #2193ff;
}
.txt-img-c{

}
.txt-img {
    display: flex;
    align-items: center;
	width:18px !important;
    height:18px;
    margin-left: 7px !important;
    
}
</style>
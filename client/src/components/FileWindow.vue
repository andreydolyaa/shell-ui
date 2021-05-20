<template>
	<div class="file-window">
		<div class="path">{{path}}</div>

		<div class="file-sys">
			<div class="files" v-for="file in files" :key="file.id">
				<div class="folder">
					<img :src="file.icon" alt />
					<p>{{file.folder}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		files() {
			return this.$store.getters.getFiles;
		},
        path(){
            return this.$store.getters.getPath;
        }
	},
};
</script>

<style>
.file-window {
	background-color: #fff;
	width: 900px;
	height: 300px;
}
.file-sys {
	display: flex;
	padding: 1rem;
        flex-wrap: wrap;
}
.path {
	background-color: rgb(230, 230, 230);
	color: black;
	padding: 5px;
}
.files {
	width: 100px;
}
.folder{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:5px 0;
}
.folder p{
    color:black;
}

.folder img {
	width: 50px;
}
</style>
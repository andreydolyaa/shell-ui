<template>
	<div class="file-window">
		<div v-if="path" class="path">/:{{path.join("/")}}</div>
        <div v-else class="path">drive:/</div>
        <div class="spacer"></div>

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
            return this.$store.getters.getPathLine;
        }
	},
};
</script>

<style>
.file-window {
	background-color: #fff;
	width: 900px;
	height: 300px;
    overflow-y: scroll;
    position: relative;
}
.file-sys {
	display: flex;
	padding: 1rem;
        flex-wrap: wrap;
}
.path {
	background-color: rgb(230, 230, 230);
	color: black;
	padding: 8px;
    position: fixed;
    width:900px;
    font-weight: bold;
}
.spacer{
    height:30px;
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
    margin-top:3px;
    color:black;
    font-size: 12px;
    font-weight: bold;
    width:80px;
    /* border:1px solid black; */
    word-wrap: break-word;
    text-align: center;
    line-height: 13px;
}

.folder img {
	width: 35px;
}
</style>
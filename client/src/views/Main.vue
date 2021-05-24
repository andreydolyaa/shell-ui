<template>
	<div class="main">
		<Terminal />
		<FileWindow />
        <Structure />
	</div>
</template>

<script>
import FileWindow from "../components/FileWindow.vue";
import Structure from '../components/Structure.vue';
import Terminal from "../components/Terminal.vue";

export default {
	components: { Terminal, FileWindow, Structure },
};
</script>
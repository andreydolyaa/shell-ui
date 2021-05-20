<template>
	<div class="main">
		<Terminal />
		<FileWindow />
	</div>
</template>

<script>
import FileWindow from "../components/FileWindow.vue";
import Terminal from "../components/Terminal.vue";

export default {
	components: { Terminal, FileWindow },
};
</script>
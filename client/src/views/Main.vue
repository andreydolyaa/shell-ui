<template>
	<div class="main">
		<div>
			<Structure />
		</div>
		<div class="tf">
			<Terminal />
			<FileWindow />
		</div>
	</div>
</template>

<script>
import FileWindow from "../components/FileWindow.vue";
import Structure from "../components/Structure.vue";
import Terminal from "../components/Terminal.vue";

export default {
	components: { Terminal, FileWindow, Structure },
};
</script>
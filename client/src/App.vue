<template>
	<div id="app">
		<router-view />
	</div>
</template>


<script>
export default {
	created() {
		this.$store.dispatch({ type: "loadFiles" });
		this.$store.dispatch({ type: "loadMessages" });
	},
};
</script>


<template>
	<div class="message-container">
		<p :style="[msg.date === 'root:~$' ? {'color':'red'} : null]">{{msg.date}}</p>
		<p class="message">{{msg.msg}}</p>
	</div>
</template>

<script>
export default {
	props: {
		msg: Object,
	},
};
</script>

<style>
.message-container {
    display: flex;
    align-items: center;
}
.message{
    margin-left: 10px;
}
</style>
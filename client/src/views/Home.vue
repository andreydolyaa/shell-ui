<template>
	<div class="home">
        <div class="title">
            <h1>TERMINAL.JS<span>_</span></h1>
        </div>
		<div class="typer-container">
			<vue-typer text="~$ learn basic terminal usage"></vue-typer>
		</div>
        <div class="start">
            <button @click="redirect">START</button>
        </div>
	</div>
</template>

<script>
import { VueTyper } from "vue-typer";
export default {
	components: {
		VueTyper,
	},
    methods:{
        redirect(){
            this.$router.push('/main');
            this.$store.dispatch({type:'loadMessages'})
        }
    }
};
</script>

<style>
.title{
    position: absolute;
    top:30%;
}
.title h1{
    font-size:6rem !important;
}
.title h1 span{
    font-size: 6rem;
    animation:1s blink step-end infinite;
}

@keyframes blink{
    from,to{
        color:transparent
    }
    50%{
        color:#04bd04;
    }
}

.typer-container{
    position:absolute;
    top:39%;
}
.start button{
    width:150px;
    height:35px;
    font-size:1.5rem;
    background-color: #646464;
    color:#04bd04;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: .3s;
}
.start button:hover{
    background-color: #575757;
    color:#04d104;
}
.vue-typer {
  font-family: monospace;
  
}

.vue-typer .custom.char {
  color: #e1e1e1;
  background-color: #1E1E1E;
  font-size:2rem;
  padding: 1px;
}
.vue-typer .custom.char.selected {
  background-color: #264F78;
}

.vue-typer .custom.caret {
  display: none;
}
</style>
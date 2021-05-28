<template>
	<div class="home">
        <div class="title">
            <h1>TERMIN4L.JS<span>_</span></h1>
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
    width:180px;
    height:40px;
    font-size:1.5rem;
    background-color:transparent;
    color:#04bd04;
    font-weight: bold;
    border: 4px solid rgb(23, 68, 116);
    cursor: pointer;
    transition: .3s;
}
.start button:hover{
    color:#04e204;
    border: 4px solid rgb(31, 89, 151);
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
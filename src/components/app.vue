<template>
  <div>
    <div style="align:center; text-align:center;">
      <h1><a href='/'>  Unibox  </a></h1>
      <hr></hr>
    </div>

    <div id="app" style="background-color:light-blue; text-align:center; display: inline block; float:left">
      <tabla style=""></tabla>
    </div>

    <router-view style="background-color:orange ;text-align:center; display:inline block; float:left" :career="$route.params.career" :courseCode="$route.params.courseCode"></router-view>
  </div>
</template>

<script>
// Los componentes son clases y por eso siempre deben importarse con la primera
// leta en mayúscula. Debería ser: import Tabla.... Así es más fácil leer.
import tabla from "./tabla.vue";
export default {
  name:"app",
  components:{tabla},
  data(){
    return{msg:"hola"}
  },
  mounted () {
    this.$vuetify.init()
  }
}
</script>

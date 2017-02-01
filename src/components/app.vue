<template>
  <div>
    <div style="float:left; width:260px">
      <h6>1. Selecciona un programa</h6>
      <h6>2. Selecciona una materia</h6>
      <h6>3. Selecciona un archivo</h6>
    </div>
    <div style="align:center; text-align:center;">
      <h1><a href='/'>  Unibox  </a></h1>
      <hr></hr>
    </div>
    <div id="app" style="float:left;">
      <tabla></tabla>
    </div>
    <transition name='fade'>
      <router-view style="float:left;" :career="$route.params.career" :courseCode="$route.params.courseCode"></router-view>
    </transition>
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

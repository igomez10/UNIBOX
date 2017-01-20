<template>
  <div>
  <div id="app" style="text-align: center;">
    <tabla style="text-align:center;"></tabla>
  </div>
    <router-view   style="text-align:center;"   :career="$route.params.career" :courseCode="$route.params.courseCode"></router-view>
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

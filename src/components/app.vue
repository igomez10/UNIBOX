<template>
  <div id="app">
    <tabla></tabla>
    <!--
      Aquí sólo se debe poner código que _siempre_ aparece, por ejemplo:
      Menú de navegación o footer que sale en todas las páginas.
      Lo más seguro es que el componente tabla no deba estar aquí, sino
      a través de una ruta? El index tb es una ruta! Ejemplo:
          { path: '/', component: Tabla  },
    -->
    <router-view :career="$route.params.career" :courseCode="$route.params.courseCode"></router-view>
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
  }
}
</script>

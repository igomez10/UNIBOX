<template>
  <div>

    <h1><a href='/'>  Unibox  </a></h1>

    <div  border=1px>
      <button class="btn btn-default" v-on:click="changeFilter('/files/admi/admi.json') , retrieveCourses()"> Administración</button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/isis/isis.json'), retrieveCourses()" > Ing. Sistemas</button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/mate/mate.json'), retrieveCourses()" >  Matemáticas</button>
    </div>
    <br>
    <div  border=1px>
      <button class="btn btn-default" v-on:click="changeFilter('/files/fisi/fisi.json') , retrieveCourses()" > Física</button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/dere/dere.json') , retrieveCourses()" > Derecho</button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/iind/iind.json') , retrieveCourses()" > Ing. Industrial</button>
    </div>
    <br>
    <div border=1px>
      <button class="btn btn-default" v-on:click="changeFilter('/files/econ/econ.json') , retrieveCourses()" > Economía</button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/dise/dise.json') , retrieveCourses()" > Diseño </button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/arqu/arqu.json') , retrieveCourses()" > Arquitectura</button>
    </div>
    <br>
    <div border=1px>
      <button class="btn btn-default" v-on:click="changeFilter('/files/icya/icya.json') , retrieveCourses()" > Ing. Civil y Ambiental</button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/quim/quim.json') , retrieveCourses()" > Química</button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/biol/biol.json') , retrieveCourses()" > Biología</button>
    </div>
    <br>
    <div border=1px>
      <button class="btn btn-default" v-on:click="changeFilter('/files/medi/medi.json') , retrieveCourses()" > Medicina </button>
      <button class="btn btn-default" v-on:click="changeFilter('/files/psic/psic.json') , retrieveCourses()" > Psicología</button>

    </div>
    <br>
    <br>
    <div class='row'>
      <div class="col-sm-4" v-if=''>
        <transition name='fade'>
          <div>
          </div>
        </transition>
      </div>
      <hr>
      <div class="col-sm-4">
        <transition name='fade'>
          <table class='table table-hover table-responsive table-bordered' v-if='filtroSeleccionado'>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              <course :courseCode='item.codigo' :courseName='"🎓 " + item.nombre' v-for='item in content' v-if='filtroSeleccionado'></course>
            </tbody>
          </table>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import course from "./course.vue"
export default{
  name:'tabla',
  components:{course},
  data : function()
  {
    return {
      content:{},
      filter:'',
      filtroSeleccionado:false,
      myCareerFile:'/admi.json',
    };
  },
  props:
  {
    message:{default:'Hola Ignacio'},
  },
  methods:
  {
    changeShow:function()
    {
      this.active=!this.active;
    },
    retrieveCourses:function()
    {
      let networkPromise = fetch(this.myCareerFile);
      networkPromise.then((rjson)=>{
        let parsingPromise = rjson.json();
        parsingPromise.then((rcourses)=>{
          this.content=rcourses;
          console.log('importe correctamente')
        });
        parsingPromise.catch(function(){console.log('Error de parsear el archivo json');});
      });
      networkPromise.catch(function(){console.log('No encontre el arhivo admi.json')});
    },
    changeFilter:function(pFilter)
    {
      this.filter=pFilter,
      this.myCareerFile=pFilter;
      this.filtroSeleccionado=true;
      console.log('cambio de filtro a ' + pFilter);
    }
  }
}


</script>

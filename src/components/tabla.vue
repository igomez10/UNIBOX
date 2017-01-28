<template>
  <div>

    <div id="careerList" style=" background-color:yellow ; float: left; display: inline block; width:410px; margin-right:50px;">
      <h2>Carreras</h2>
      <ul>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/admi/admi.json') , retrieveCourses()"> Administración</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/isis/isis.json'), retrieveCourses()" > Ing. Sistemas</button></li>
        <button class="btn btn-default" v-on:click="changeFilter('/files/dise/dise.json') , retrieveCourses()" > Diseño </button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/fisi/fisi.json') , retrieveCourses()" > Física</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/dere/dere.json') , retrieveCourses()" > Derecho</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/iind/iind.json') , retrieveCourses()" > Ing. Industrial</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/econ/econ.json') , retrieveCourses()" > Economía</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/arqu/arqu.json') , retrieveCourses()" > Arquitectura</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/mate/mate.json'), retrieveCourses()" >  Matemáticas</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/icya/icya.json') , retrieveCourses()" > Ing. Civil y Ambiental</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/quim/quim.json') , retrieveCourses()" > Química</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/biol/biol.json') , retrieveCourses()" > Biología</button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/medi/medi.json') , retrieveCourses()" > Medicina </button></li>
        <li><button class="btn btn-default" v-on:click="changeFilter('/files/psic/psic.json') , retrieveCourses()" > Psicología</button></li>
      </ul>
    </div>
    <div style="background-color:red ; display: inline block; float:left;" id="courseList">
      <h5 v-if='!filtroSeleccionado' style="color:blue;">1. Selecciona una carrera para ver sus cursos</h5>
      <transition name='fade'>
        <div class="list-group" style="text-align:left;" v-if='filtroSeleccionado'>
          <div align=center >
            <h5 style="color:red;">
              <!-- 2. Selecciona una materia para ver sus archivos -->
            </h5>
          </div>
          <h2 style='text-align:center'>Materias</h2>
          <div align='center' class="list-group" style="width:400px;" >
            <course :courseCode='item.codigo' :courseName='item.nombre' v-for='item in content' style="text-align: left;"></course>
          </div>
        </div>
      </div>

    </transition>

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
      filtroSeleccionado:false
    };
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
    }
  }
  // },
  // mounted: function(){
  //   window.scroll(100,document.body.scrollHeight + 1000000000000)
  // }
}
</script>

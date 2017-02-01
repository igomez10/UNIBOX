<style scoped lang="css">
.list-group-item:active {
  /*background-color: gray;*/
}
</style>

<template>
  <div>

    <div id="careerList" style="float: left; margin-right:30px">

      <div>

        <div>
          <h2>Carreras</h2>
        </div>

        <div class="list-group" style="align: center; overflow: scroll; height: 55%; width: 300px">

          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/admi/admi.json') , retrieveCourses()" > Administración</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/isis/isis.json') , retrieveCourses()" > Ing. Sistemas</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/dise/dise.json') , retrieveCourses()" > Diseño </a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/fisi/fisi.json') , retrieveCourses()" > Física</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/dere/dere.json') , retrieveCourses()" > Derecho</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/iind/iind.json') , retrieveCourses()" > Ing. Industrial</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/econ/econ.json') , retrieveCourses()" > Economía</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/arqu/arqu.json') , retrieveCourses()" > Arquitectura</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/mate/mate.json') , retrieveCourses()" >  Matemáticas</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/icya/icya.json') , retrieveCourses()" > Ing. Civil y Ambiental</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/quim/quim.json') , retrieveCourses()" > Química</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/biol/biol.json') , retrieveCourses()" > Biología</a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/medi/medi.json') , retrieveCourses()" > Medicina </a>
          <a class="list-group-item"  style="margin-bottom:2px"  v-on:click="changeFilter('/files/psic/psic.json') , retrieveCourses()" > Psicología</a>

        </div>

      </div>

    </div>
    <div style="float: left;" id="courseList">
      <transition name='fade'>
        <div class="list-group" style="text-align:left; width:350px; margin-right: 30px" v-if='$route.params.career != undefined || filtroSeleccionado'>
          <h2>Materias</h2>
          <div style='align:center; overflow: scroll; height:55%' class="list-group"  >
            <course v-on:click="selectCourse()" :courseCode='item.codigo' :courseName='item.nombre' v-for='item in content' style="text-align: left;">
            </course>
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
      filtroSeleccionado:false,
      courseSelected: false
    };
  },
  methods:
  {
    selectCourse: function()
    {
      this.courseSelected=true;
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
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.scrollTo(0 , 500);
      }
    }
  },
  mounted: function(){
    if(this.$route.fullPath != "/"){
      this.myCareerFile = '/files/' + 
                    this.$route.params.career +"/"+ 
                    this.$route.params.career + ".json";
      this.retrieveCourses();        
    }

  }
}
</script>

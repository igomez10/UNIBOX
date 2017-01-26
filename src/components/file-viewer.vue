<template>
  <div align="center">
    <br>


    <h3> Materia: {{courseCode}} </h3>
    <h4> Archivos: </h4>
    <div align='center'>
      <div align='center' class="list-group" style="width:400px;">
        <file :files='this.files'></file>
      </div>
    </div>
    <h6 v-show="isEmpty" > Lo sentimos, no hay archivos disponibles 😢. Sé el primero y sube un archivo! ❤️</h6>
    <div align="center">
      <fileuploader></fileuploader>
    </div>
  </div>
</template>


<script>
import fsapi from '../lib/fsapi-client.js';
fsapi.config(("http://" + window.location.hostname + ":8080"),"12345");
import fileuploader from "./fileuploader.vue";
window.fsapi = fsapi;
import file from "./file.vue";
import $ from 'jquery'


export default{
  name:"fileViewer",
  components:{file, fsapi, fileuploader},
  data: function(){
    return {
      files:'holadata',
      isEmpty:true
    };
  },
  props:{
    courseCode:String,
    courseName:String,
    career:String,
    scrollPosition:Number,
    filtroSeleccionado:{
      type:Boolean,
      default:false,
    }
  },
  created : function()
  {
    this.getFiles();
    $.notify("Baja hasta el final de la pagina para ver los archivos", 'success')
    if( Object.keys(this.files).length >= 1 ){
      this.isEmpty = false;
    }
    else{
      this.isEmpty=true;
    }
  },
  watch:{
    $route : function(){
      var a = this.getFiles();
      console.log("cambio la ruta");
      if( Object.keys(this.files).length >= 1 ){
        this.isEmpty = false;
      }
      else{
        this.isEmpty = true;
      }
    }
  },
  methods:
  {
    getFiles:function()
    {
      //courseUrl start from the career folder. not from files
      const x=function(y,z){console.log(y,z)}
      const theUrl =this.career + "/" + this.courseCode

      const filePromise= new Promise( (resolve, reject)=>{
        fsapi.list( theUrl , (res)=>{
          this.files= res
          const temp11=res
          resolve(res.data)
          reject(console.log("No existe la carpeta o algo salió mal"))
        })
      })
      filePromise.then(function(data){})

    }

  }
}



</script>

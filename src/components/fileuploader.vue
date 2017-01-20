<template>
  <div>
    <br>
    <hr>
    <div class="panel-body">
      <h2>Subir un archivo</h2>
      <button v-on:click="selectFile()" class="btn btn-lg upload-btn" type="button">Paso 1: Seleccionar Archivo</button>
      <button class="btn btn-success" v-on:click="$refs.submit.click()">Paso 2: ENVIAR</button>
    </div>
    <br></br>
    <form method="post" :action='this.routeAction' v-on:submit.prevent="uploadFile($route)" enctype="multipart/form-data">
      <input v-show="false" v-on:change='setFiles()' type='file' name='filedata' ref='input' id='upload-input' multiple="multiple"></input>
      <input v-show="false" type='submit' ref="submit" value="submit"></input>
    </form>
  </div>
</template>

<script>
import $ from 'jquery';
import fsapi from '../lib/fsapi-client.js';
fsapi.config("http://localhost:8080","12345");
window.fsapi = fsapi;

export default{
  name:"fileuploader",
  components:{},
  data: function(){
    return{
      routeAction:  "//localhost:8080/12345/file/" +
      this.$route.params.career + "/" +
      this.$route.params.courseCode +
      "/unarchivo.txt",
      selectedFiles: "no he seleccionado archivos",
      ruta: this.$route
    }
  },
  props:{
    progressBarText:String,
    progressBarWidth:Number
  },
  methods:{
    selectFile: function(){
      this.$refs.input.click();
    },
    setFiles: function(){
      this.selectedFiles = this.$refs.input.files;

    },
    uploadFile: function(ruta){
      var files = this.selectedFiles;
      console.log('se estan subiendo ' + files.length + ' archivos')
      if(files.length > 0){
        var formData = new FormData();
        for(var i = 0 ; i < files.length ; i++){
          var file = files[i];
          console.log(file.name)
          formData.append('filedata' , file , file.name);
          this.routeAction = "//localhost:8080/12345/file/" +
          this.$route.params.career + "/" +
          this.$route.params.courseCode + "/" +
          file.name
          $.ajax({ url: this.routeAction ,
            type:'POST',
            data:file,
            cache : false,
            processData: false,
            contentType: false,
            success: function(result){
              console.log("pude subir exitosamente")
              console.log(files[0])
            }})

          }
        }
      }

    }
  }
  </script>

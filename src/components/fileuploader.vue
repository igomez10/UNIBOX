<template>
  <div style='float: left; margin-left: 30px; width: 250px;'>
    <div align='center' v-if="selected" style="overflow: scroll; height: 10%;">
    <ul>
      <li v-for="file in selectedFiles">
        <label>Nombre:</label> {{file.name}}
        <label>Tamaño:</label> {{file.size}} bytes
      </li>
    </ul>
  </div>
    <div class="panel-body" style="width: 450px">
      <h2>Subir un archivo</h2>
      <button v-on:click="selectFile()" class="btn btn-lg upload-btn" type="button">Paso 1: Seleccionar Archivo</button>
      <br></br>
      <button class="btn btn-success" v-on:click="$refs.submit.click()">Paso 2: ENVIAR</button>
    </div>
    <br></br>
    <p>Nota: Unibox aún no soporta carpetas. Solo puedes subir archivos</p>

    <form method="post" :action='this.routeAction' v-on:submit.prevent="uploadFile($route)" enctype="multipart/form-data">
      <input v-show="false" v-on:change='setFiles()' type='file' name='filedata' ref='input' id='upload-input' multiple="multiple"></input>
      <input v-show="false" type='submit' ref="submit" value="submit"></input>
    </form>
  </div>
</template>

<script>
import $ from 'jquery';
import fsapi from '../lib/fsapi-client.js';
fsapi.config("http://" + window.location.hostname + ":8080","12345");
window.fsapi = fsapi;

export default{
  name:"fileuploader",
  components:{},
  data: function(){
    return{
      routeAction:  "//157.253.154.161:8080/12345/file/" +
      this.$route.params.career + "/" +
      this.$route.params.courseCode +
      "/unarchivo.txt",
      selectedFiles: "no he seleccionado archivos",
      ruta: this.$route,
      files:{}
    }
  },
  props:{
    progressBarText: String,
    progressBarWidth: Number,
    courseDestination: String,
    selected: {
      type: Boolean,
      default: false
    }

  },
  methods:{
    selectFile: function(){
      this.$refs.input.click();
    },
    setFiles: function(){
      this.selectedFiles = this.$refs.input.files;
      console.log(this.selectedFiles.name);
      if(this.selectedFiles != null){
        this.selected = true;
      }

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
          this.routeAction = "//" + window.location.hostname +":8080/12345/file/" +
          this.$route.params.career + "/" +
          this.$route.params.courseCode + "/" +
          file.name.replace(/ /g , "")
          $.ajax({ url: this.routeAction ,
            type:'POST',
            data:file,
            cache : false,
            processData: false,
            contentType: false,
            success: function(result){
              console.log("pude subir exitosamente")
              console.log(files[0])
            }
          })
        }
        $.notify("Recarga para ver los cambios", 'success')
        window.location.reload()
    }
    }
    }
  }
</script>

<template>
  <div style='float: left; margin-left: 30px; width: 250px;'>

    <div class="panel-body" style="width: 350px">
      <h3>
        Subir archivos
      </h3>
      <div align=center>
        <button v-on:click="selectFile()" class="btn btn-lg upload-btn" type="button">
          Seleccionar
        </button>
        <button v-if='selectedFiles!=""' class="btn btn-success" v-on:click="$refs.submit.click()">
          ENVIAR
        </button>
        <div class="container" style="width:100%">
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" :style="{width: progValue + '%'}">
              <p v-show='progValue<100'>{{progValue}}</p>
              <span class="sr-only"></span>
            </div>
          </div>
          <button @click="complete()"></button>
        </div>
      </div>
      <div align='center' v-if="selected" style="overflow: auto; width: 100%;">
        <ul style="overflow-y:auto;">
          <li v-for="file in selectedFiles">
            <label>Nombre:</label> {{file.name}}
            <label>Tamaño:</label> {{file.size}} bytes
          </li>
        </ul>
      </div>
    </div>
    <div>
      <p>
        Nota: Solo puedes subir archivos, no carpetas
      </p>
    </div>
    <div>
      <form method="post" :action='this.routeAction' v-on:submit.prevent="uploadFile($route)" enctype="multipart/form-data">
        <input v-show="false" v-on:change='setFiles()' type='file' name='filedata' ref='input' id='upload-input' multiple="multiple">
      </input>
      <input v-show="false" type='submit' ref="submit" value="submit">
    </input>
  </form>
</div>
</div>
</template>

<script>
import $ from 'jquery';
import fsapi from '../lib/fsapi-client.js';
fsapi.config("http://" + window.location.hostname + ":8080", "12345");
window.fsapi = fsapi;

export default {
  name: "fileuploader",
  components: {},
  data: function() {
    return {
      routeAction: "//157.253.154.161:8080/12345/file/" +
      this.$route.params.career + "/" +
      this.$route.params.courseCode +
      "/unarchivo.txt",
      selectedFiles: "",
      ruta: this.$route,
      files: {},
      message: "VuejsConfirmation",
      progValue: 0
    }
  },
  props: {
    progressBarText: String,
    progressBarWidth: Number,
    courseDestination: String,
    selected: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    selectFile: function() {
      this.$refs.input.click();
    },
    setFiles: function() {
      this.selectedFiles = this.$refs.input.files;
      console.log(this.selectedFiles.name);
      if (this.selectedFiles != null) {
        this.selected = true;
      }

    },
    uploadFile: async function(ruta) {
      var files = this.selectedFiles;
      // var files = this.sanitizeFiles(preFiles)
      if (files.length > 0) {
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var fileName = file.name;

          console.log(fileName);

          fileName = this.sanitizeName(fileName)
          formData.append('data', file);
          this.routeAction = "//" + window.location.hostname + ":8080/12345/file/" +
          this.$route.params.career + "/" +
          this.$route.params.courseCode + "/" +
          fileName


          console.log(fileName);

          this.complete()
          $.ajax({
            url: this.routeAction,
            type: 'POST',
            data: file,
            contentType: false,
            processData: false,
            success: (result)=>{
              this.progValue=101;
              this.waitSomething(10000);
              location.reload()
            }
          })
        }
        // $.notify("Recarga para ver los cambios", 'success')
        // alert("La pagina se actualizara automaticamente cuando se termine de cargar")
      }
    },
    sanitizeName: function(aName){
      var newArray = aName.split('.')
      var extension = newArray[newArray.length-1]
      var newName = aName.replace(/[^a-z0-9]/gi,'') + '.' + extension
      return newName
    },
    complete: async function() {
      this.progValue = Math.floor(Math.random()*10);
      for(var i=0; this.progValue<101 && i<100; i++){
        await this.sleep(Math.random() * 1500)
        setTimeout(
          ()=>{
            return this.progValue = Math.floor(this.progValue + Math.random()*30)
          }, 100
        );

      }
    },
    waitSomething: async function(x){
      await this.sleep(x);
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    refresh: function(){
      // location.reload()
    }
  },
  watch: {
    progValue: function(){
      if(this.progValue>100){
        this.refresh();
      }
    }
  },
  computed:{
    sizeOfLoad: function(){
      if(this.selectedFiles !=""){
        var accumulate = 0;
        for(var i=0; i<this.selectedFiles.length;i++){
          accumulate = accumulate + this.selectedFiles[i].size;
        }
        return accumulate;
      }
    }
  }


}
</script>

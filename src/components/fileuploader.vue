<template>

  <div align="center">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div class="panel panel-default">
            <div class="panel-body">
              <span class="glyphicon glyphicon-cloud-upload"></span>
              <h2>File Uploader</h2>
              <h4>Ignacio</h4>
              <div class="progress">
                <div class="progressBarWidth" role="progressbar"></div>
              </div>
              <button v-on:click="selectFile()" class="btn btn-lg upload-btn" type="button">Upload File</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form method="post" :action='this.routeAction' v-on:submit.prevent="uploadFile($route)" enctype="multipart/form-data">
      <input v-show='false' v-on:change='setFiles()' type='file' name='filedata' ref='input' id='upload-input' multiple="multiple"></input>
      <input type='submit' ref="submit" value="submit"></input>
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
      this.routeAction = "//localhost:8080/12345/file/" +
      this.$route.params.career + "/" +
      this.$route.params.courseCode + "/" +
      this.selectedFiles[0].name
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
        }
        // this.$refs.submit.click();
        // var client = new XMLHttpRequest();
        // client.open('post', this.routeAction , true );
        // client.setRequestHeader("Content-Type", "multipart/form-data");
        // client.send(formData);

        $.ajax({ url: this.routeAction ,
          type:'POST',
          data:files[0],
          // data:'este es un archivo elm que estoy subiendo ..dsfgsdfgsdfgsdfgsdf[ojasndc[oaweicnwq[eoin]]]',
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
  </script>

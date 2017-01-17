<template>
  <div align="center">

    <br>
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
                  <div class="progress-bar" role="progressbar"></div>
                </div>
                <button class="btn btn-lg upload-btn" type="button">Upload File</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input id="upload-input" type="file" name="uploads[]" multiple="multiple">
    </div>

  </br>
  <br>
  <h4> Materia: {{courseCode}} </h4>
  <h4> Archivos: </h4>
</br>
<div v-show='fileName!=undefined'>
  <br>
  <p><label>Nombre:</label> {{fileName}}</p>
  <p><label>Tamaño:</label> {{fileSize}}</p>
  <p><label>Tipo:</label>   {{fileType}}<p>
    <p>Materia Destino: </p>
    <h3><strong>Tu archivo quedará a la materia {{courseCode}}</strong></h3>
    <button class="btn btn-success">Upload</button>
  </div>
  <div id=fileList>
    <file v-bind:files='this.files'></file>
  </div>
</div>
</template>









<script>
import fsapi from '../lib/fsapi-client.js';
fsapi.config("http://localhost:8080","12345");
import fileuploader from "./fileuploader.js";
window.fileuploader = fileuploader;
window.fsapi = fsapi;
import file from "./file.vue";


export default{
  name:"fileViewer",
  components:{file, fsapi, fileuploader},
  data: function(){
    return {
      filesToUpload:'',
      fileName:undefined,
      fileSize:undefined,
      fileType:undefined,
      files:'holadata'
    };
  },
  props:{
    courseCode:String,
    courseName:String,
    career:String
  },
  created : function()
  {
    this.getFiles()
  },
  watch:{
    $route : function(){
      this.getFiles()
      console.log("cambio la ruta")
    }
  },
  methods:
  {
    onFileChange : function(e)
    {
      console.log(e)
      this.filesToUpload = e.path[0].files[0];
      this.fileName=this.filesToUpload.name;
      this.fileSize=this.filesToUpload.size;
      this.fileType=this.filesToUpload.type;
      let ladata=this.filesToUpload;
      window.f = this.filesToUpload;
      console.log("File to upload: Name: " + this.fileName +", Size: "+ this.fileSize + ", Type: "+ this.fileType + typeof(ladata));
      var reader  = new FileReader();
      console.log(reader.readAsDataURL(this.filesToUpload));
    },
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
      filePromise.then(function(data){
      })
    }

  }
}



</script>

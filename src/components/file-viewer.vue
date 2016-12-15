<template>
  <div>
    <h1> Materia: {{courseCode}} </h1>
    <h1> Archivos: </h1>
    <label class="btn btn-default btn-file">
      Subir Archivos <input type="file" id="file" class='form-control' @change="onFileChange">
    </label>
    <br>
    <div v-show='fileName!=undefined'>
      <br>
      <p><label>Nombre:</label> {{fileName}}</p>
      <p><label>Tamaño:</label> {{fileSize}}</p>
      <p><label>Tipo:</label> {{fileType}}<p>
        <p>Materia Destino: </p>
        <!-- button used to upload files -->
        <h3><strong>Tu archivo quedará a la materia {{courseCode}}</strong></h3>
        <button class="btn btn-success">Upload</button>
      </div>
      <div id=fileList>
        <file v-bind:files='this.files'></file>
      </div>
    </div>
  </template>

  <script>
  import fsapi from '../lib/fsapi-client.js'
  fsapi.config("http://localhost:8080","12345")
  import file from "./file.vue"
  export default{
    name:"fileViewer",
    components:{file, fsapi},
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
        let ladata=this.filesToUpload.value
        console.log("File to upload: Name: " + this.fileName +", Size: "+ this.fileSize + ", Type: "+ this.fileType + ladata);
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
          })
        })
        filePromise.then(function(data){
        })
      }

    }
  }

  </script>

  <template>
    <div style="float: left; align: center;">
      <div style='float: left;'>
        <h2>Archivos</h2>
        <div align='center' >
            <div style='align:center; overflow: auto; height:55%; width: 400px' class="list-group">
            <file :files='this.files'></file>
          </div>
        </div>
      </div>
      <div style="float: left;">
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
      filtroSeleccionado:{
        type:Boolean,
        default:false,
      }
    },
    created : function()
    {
      this.getFiles();
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.scrollTo(0 , 1000 );
      }
      if( Object.keys(this.files).length > 0 ){
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
        window.scrollTo(0 , 1000 );
        if( Object.keys(this.files).length > 0 ){
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
        if( Object.keys(this.files).length > 0 ){
          this.isEmpty = false;
        }
        else{
          this.isEmpty=true;
        }
      }

    }
  }

  </script>

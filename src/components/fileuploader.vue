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
    <input v-show='false' v-on:change="uploadFile()" ref="input" id="upload-input" type="file" name="uploads[]" multiple="multiple">
  </div>


</template>

<script>
import $ from 'jquery';

export default{
  name:"fileuploader",
  components:{},
  data: function(){
    return{

    };
  },
  props:{
    progressBarText:String,
    progressBarWidth:Number
  },
  methods:{
    selectFile : function(){
      this.$refs.input.click();
    },
    uploadFile : function(){
      var files = this.$refs.input.files;
      console.log('se estan subiendo ' + files.length + " archivos")
      if(files.length > 0){
        var formData = new FormData();

        for(var i = 0 ; i < files.length ; i++){
          var file = files[i];
          console.log(file.name)
          formData.append('upload[]' , file , file.name);
        }
        $.ajax({
          url: '/uploads',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(data){
            console.log('upload successful!\n' + data);
          },
          xhr: function() {
            // create an XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // listen to the 'progress' event
            xhr.upload.addEventListener('progress', function(evt) {

              if (evt.lengthComputable) {
                // calculate the percentage of upload completed
                var percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100);

                // update the Bootstrap progress bar with the new percentage
                $('.progress-bar').text(percentComplete + '%');
                $('.progress-bar').width(percentComplete + '%');

                // once the upload reaches 100%, set the progress bar text to done
                if (percentComplete === 100) {
                  $('.progress-bar').html('Done');
                }

              }

            }, false);

            return xhr;
          }
        });
      }
    }

  }
}
</script>

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
                <div class="progress-bar" role="progressbar"></div>
              </div>
              <button v-on:click="selectFile()" class="btn btn-lg upload-btn" type="button">Upload File</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input v-show='false' ref="input" id="upload-input" type="file" name="uploads[]" multiple="multiple">
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

  },
  methods:{
    selectFile : function(){
      this.$refs.input.click();
    }
  }
}
</script>

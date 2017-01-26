<template>
  <div align=center style="text-align:center;">
    <hr></hr>
    <br></br>
    <v-row fluid>
      <v-col xs6 offset-xs3 fluid>
        <transition name='fade'>
          <table class='table table-responsive table-bordered'>
            <thead>
              <th style="text-align:center;">Nombre</th>
            </thead>
            <tbody>
              <tr fluid v-for="file in files">
                <td v-show=" file.path.split('/')[3]!='.DS_Store' && file.path.split('/')[3].includes('.') " > <a :href='"files" + file.path' >📝 {{file.path.split("/")[3]}} </a> </td>
              </tr fluid>
            </tbody>
          </table>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default{
  name:"file",
  props: {
    files:{default:''}
  },
  mounted: function(){
    window.scroll(100,document.body.scrollHeight + 1000000000000)
    console.log(document.body.scrollHeight)
  }
}
</script>

<template>
  <div align=center>
    <hr>
    <table class='table table-hover table-responsive table-bordered' >
      <thead>
        <th>Nombre Archivo</th>
      </thead>
      <tbody>
        <tr v-for="file in files">
          <td> <a :href='"files/" + file.path' >📰 {{file.path.split("/")[3]}} </a> </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default{
  name:"file",
  props:{
    files:{default:''}
  },
  methods:
  {
    // openFile:function(aPath){
    // 	const x=function(y){console.log(y)}
    // 	fsapi.open(aPath , x)
    // }
  }
}
</script>

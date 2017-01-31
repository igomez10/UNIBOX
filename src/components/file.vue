<template>
  <div style="text-align:left;">
    <a class="list-group-item" style="margin:2px" v-for="file in files" v-show=" file.path.split('/')[3]!='.DS_Store' && file.path.split('/')[3].includes('.')">
      <div>
        <a :href='"files" + file.path' target="_blank" > 📝 {{file.path.split("/")[3]}} </a>
      </div>
    </a>
  </div>
</template>

<script>
export default{
  name:"file",
  props: {
    files:{default:''}
  }
}
</script>

<template>
  <div>
    <a class="list-group-item" style="margin:2px" v-for="file in files" v-show=" file.path.split('/')[3]!='.DS_Store' && file.path.split('/')[3].includes('.')">
      <div>
        <a :href='"files" + file.path' target="_blank" style="float:left; text-align:left;">
          📝 {{file.path.split("/")[3]}}
        </a>
        <div align=right>
          <i class="material-icons" title="Denunciar" v-on:click="flagAs(file.path)">
            delete_forever
          </i>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default{
  name:"file",
  props: {
    files:{default:''}
  },
  methods:{
    flagAs: function(path){
      console.log("Denuncia: " + path);
      confirm(
        'Presiona "cancel" para volver. ' +
        'Estas a punto de denunciar un archivo por contenido inapropiado '  +
        'o violacion de derechos de autor...(etc) Presiona "OK" para ' +
        'solicitar una revisión.'
      );
    }
  }
}
</script>

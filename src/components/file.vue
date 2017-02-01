<template>
  <div>
    <a class="list-group-item" style="margin:2px" v-for="file in files" v-show=" file.path.split('/')[3]!='.DS_Store' && file.path.split('/')[3].includes('.')">
      <div style="height: 43px;">
        <a :href='"files" + file.path' target="_blank" style="float:left; text-align:left; width: 200px;">
          📝 {{showName(file.path.split("/")[3])}}
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
    },
    showName: function(aName){
      if(aName.length > 40){
        var newName="";
        newName = aName.substring(0, aName.length/2) + " " + aName.substring(aName.length/2 , aName.length);
        return newName;
      }
      else{
        return aName;
      }
    }
  }
}
</script>

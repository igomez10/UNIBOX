<template>
  <tr>
    <td ><router-link :id='courseCode' :to='"/" + this.getCareer()+"/"+ courseCode'> {{courseCode}}</router-link></td>
    <td>{{courseName}}</td>
  </tr>
</template>


<script>
export default{
  name:'course',
  data:function(){
    return{
      isSelected:false,
      files:[]
    }
  },
  props:{
    courseCode:{default:''},
    courseName:{default:''}
  },
  methods:{
    select:function(){
      this.isSelected=true;
    },
    getCareer:function(){
      var a= this.courseCode.substring(0,4).toLowerCase();
      return a;
    },
  }
}
</script>

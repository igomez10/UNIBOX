<template>
  <tr>
    <td >
      <router-link :id="courseCode" :to="courseUrl">
        {{courseCode}}
      </router-link>
    </td>
    <td>{{courseName}}</td>
  </tr>
</template>


<script>
export default{
  name: 'course',
  data:function(){
    return {
      isSelected: false,
      files: []
    }
  },
  props:{
    courseCode: {default:''},
    courseName: {default:''}
  },
  methods:{
    select:function(){
      this.isSelected = true;
    },

  },
  computed: {
    career: function(){
      const a = this.courseCode.substring(0,4).toLowerCase();
      return a;
    },
    courseUrl: function(){
       return "/" + this.career + "/" + this.courseCode;
    }
  }
}
</script>

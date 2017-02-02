<template>
  <div style="margin: 2px;" align=center>
    <router-link :courseCode="courseCode" :courseName="courseName" :to="courseUrl" >
      <a class="list-group-item">
        🎓 {{courseCode}} - {{courseName}}
      </a>
    </router-link>
  </div>
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
    select: function(){
      this.isSelected = true;
    }
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
